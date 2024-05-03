import { middleware } from "@/middleware";
import axios, { AxiosRequestConfig } from "axios";
import { cookies, headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const API_KEY = process.env.API_KEY;
const API_EMAIL = process.env.API_EMAIL;

const cfAPI = axios.create({
  baseURL: "https://api.cloudflare.com/client/v4",
  headers: {
    "X-Auth-Key": API_KEY,
    "X-Auth-Email": API_EMAIL,
  },
});

export const GET = async (req: NextRequest, res: NextResponse) => {
  try {
    const { data } = await cfAPI.get("/zones");

    return NextResponse.json(
      {
        data,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(error);
  }
};

interface Zone {
  id: string;
  name: string;
  domain: string | null;
  zoneId: string | null;
  zoneName: string | null;
}

interface ApiResponse {
  success: boolean;
  result: Zone;
  errors: ErrorApi[];
}

interface ErrorApi {
  code: number;
  message: string;
}

interface history {
  zoneId: string | null;
  recordId1: string | null;
  recordId2: string | null;
}

export const POST = async (req: NextRequest, res: NextResponse) => {
  const payload = await req.json();
  const histoys: history = {
    zoneId: null,
    recordId1: null,
    recordId2: null,
  };

  try {
    let { data } = await cfAPI.post("/zones/", payload);
    histoys.zoneId = data.result.id;

    data = await cfAPI.post(`/zones/${histoys.zoneId}/dns_records`, {
      content: "cname.s.id",
      name: data.result.name,
      proxied: false,
      type: "CNAME",
      comment: "Domain verification record",
      tags: ["owner:dns-team"],
      ttl: 3600,
    });
    histoys.recordId1 = data.result.id;
    data = await cfAPI.post(`/zones/${histoys.zoneId}/dns_records`, {
      content: "cname.s.id",
      name: `www.${data.name}`,
      proxied: false,
      type: "CNAME",
      comment: "Domain verification record",
      tags: ["owner:dns-team"],
      ttl: 3600,
    });
    histoys.recordId2 = data.result.id;
    await cfAPI.patch(`/zones/${histoys.zoneId}/settings/ssl`, {
      value: "full",
    });

    return NextResponse.json({ message: "ok", data: data });
  } catch (e) {
    if (axios.isAxiosError(e)) {
      if (histoys.recordId2 != null) {
        await cfAPI.delete(
          `/zones/${histoys.zoneId}/dns_records/${histoys.recordId2}`
        );
      }
      if (histoys.recordId1 != null) {
        await cfAPI.delete(
          `/zones/${histoys.zoneId}/dns_records/${histoys.recordId1}`
        );
      }
      if (histoys.zoneId != null) {
        await cfAPI.delete(`/zones/${histoys.zoneId}`);
      }

      return NextResponse.json(
        { message: "ok", data: e.response?.data },
        { status: e.response?.status }
      );
    }
  }
};

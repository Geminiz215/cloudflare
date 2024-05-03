/* FullCalendar Types */
import { EventApi, EventInput } from "@fullcalendar/core";

/* Chart.js Types */
import { ChartData, ChartOptions } from "chart.js";

type InventoryStatus = "INSTOCK" | "LOWSTOCK" | "OUTOFSTOCK";

type Status = "DELIVERED" | "PENDING" | "RETURNED" | "CANCELLED";

export type LayoutType = "list" | "grid";
export type SortOrderType = 1 | 0 | -1;
/////

export type DnsList = {
  errors: string[];
  messages: string[];
  result: Result[];
  result_info: ResultInfo;
  success: boolean;
  [property: string]: any;
};

export interface Result {
  account: Account;
  activated_on: string;
  created_on: string;
  development_mode: number;
  id: string;
  meta: Meta;
  modified_on: string;
  name: string;
  name_servers: string[];
  original_dnshost: null;
  original_name_servers: string[];
  original_registrar: null;
  owner: Owner;
  paused: boolean;
  permissions: string[];
  plan: Plan;
  status: string;
  tenant: Tenant;
  tenant_unit: TenantUnit;
  type: string;
  [property: string]: any;
}

export interface Account {
  id: string;
  name: string;
  [property: string]: any;
}

export interface Meta {
  custom_certificate_quota: number;
  multiple_railguns_allowed: boolean;
  page_rule_quota: number;
  phishing_detected: boolean;
  step: number;
  [property: string]: any;
}

export interface Owner {
  email: null;
  id: null;
  type: string;
  [property: string]: any;
}

export interface Plan {
  can_subscribe: boolean;
  currency: string;
  externally_managed: boolean;
  frequency: string;
  id: string;
  is_subscribed: boolean;
  legacy_discount: boolean;
  legacy_id: string;
  name: string;
  price: number;
  [property: string]: any;
}

export interface Tenant {
  id: null;
  name: null;
  [property: string]: any;
}

export interface TenantUnit {
  id: null;
  [property: string]: any;
}

export interface ResultInfo {
  count: number;
  page: number;
  per_page: number;
  total_count: number;
  total_pages: number;
  [property: string]: any;
}

///
export interface CustomEvent {
  name?: string;
  status?: "Ordered" | "Processing" | "Shipped" | "Delivered";
  date?: string;
  color?: string;
  icon?: string;
  image?: string;
}

interface ShowOptions {
  severity?: string;
  content?: string;
  summary?: string;
  detail?: string;
  life?: number;
}

export interface ChartDataState {
  barData?: ChartData;
  pieData?: ChartData;
  lineData?: ChartData;
  polarData?: ChartData;
  radarData?: ChartData;
}
export interface ChartOptionsState {
  barOptions?: ChartOptions;
  pieOptions?: ChartOptions;
  lineOptions?: ChartOptions;
  polarOptions?: ChartOptions;
  radarOptions?: ChartOptions;
}

export interface AppMailProps {
  mails: Demo.Mail[];
}

export interface AppMailSidebarItem {
  label: string;
  icon: string;
  to?: string;
  badge?: number;
  badgeValue?: number;
}

export interface AppMailReplyProps {
  content: Demo.Mail | null;
  hide: () => void;
}

declare namespace Demo {
  interface Task {
    id?: number;
    name?: string;
    description?: string;
    completed?: boolean;
    status?: string;
    comments?: string;
    attachments?: string;
    members?: Member[];
    startDate?: string;
    endDate?: string;
  }

  interface Member {
    name: string;
    image: string;
  }

  interface DialogConfig {
    visible: boolean;
    header: string;
    newTask: boolean;
  }

  interface Mail {
    id: number;
    from: string;
    to: string;
    email: string;
    image: string;
    title: string;
    message: string;
    date: string;
    important: boolean;
    starred: boolean;
    trash: boolean;
    spam: boolean;
    archived: boolean;
    sent: boolean;
  }

  interface User {
    id: number;
    name: string;
    image: string;
    status: string;
    messages: Message[];
    lastSeen: string;
  }

  interface Message {
    text: string;
    ownerId: number;
    createdAt: number;
  }

  //ProductService
  type Product = {
    id?: string;
    code?: string;
    name: string;
    description: string;
    image?: string;
    price?: number;
    category?: string;
    quantity?: number;
    inventoryStatus?: InventoryStatus;
    rating?: number;
    orders?: ProductOrder[];
    [key: string]:
      | string
      | string[]
      | number
      | boolean
      | undefined
      | ProductOrder[]
      | InventoryStatus;
  };

  type ProductOrder = {
    id?: string;
    productCode?: string;
    date?: string;
    amount?: number;
    quantity?: number;
    customer?: string;
    status?: Status;
  };

  type Payment = {
    name: string;
    amount: number;
    paid: boolean;
    date: string;
  };

  //CustomerService
  type Customer = {
    id?: number;
    name?: string;
    country?: ICountryObject;
    company?: string;
    date: Date;
    status?: string;
    activity?: number;
    balance?: number | string;
    verified?: boolean;
    amount?: number;
    price?: number;
    rating?: number;
    image?: string;
    orders?: Demo.Customer[];
    inventoryStatus?: string;
    representative: {
      name: string;
      image: string;
    };
  };

  interface Event extends EventInput {
    location?: string;
    description?: string;
    tag?: {
      name: string;
      color: string;
    };
  }

  // PhotoService
  type Photo = {
    title: string;
    itemImageSrc?: string | undefined;
    thumbnailImageSrc?: string | undefined;
    alt?: string | undefined;
  };

  type Country = {
    name: string;
    code: string;
  };

  // IconService
  type Icon = {
    icon?: {
      paths?: string[];
      attrs?: [{}];
      isMulticolor?: boolean;
      isMulticolor2?: boolean;
      grid?: number;
      tags?: string[];
    };
    attrs?: [{}];
    properties?: {
      order?: number;
      id: number;
      name: string;
      prevSize?: number;
      code?: number;
    };
    setIdx?: number;
    setId?: number;
    iconIdx?: number;
  };
}

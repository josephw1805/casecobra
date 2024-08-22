"use client";

import { formatPrice } from "@/lib/utils";
import { OrderStatus, ShippingAddress, User } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import StatusDropdown from "./StatusDropdown";

export type Order = {
  id: string;
  user: User;
  shippingAddress: ShippingAddress;
  status: OrderStatus;
  createdAt: Date;
  amount: number;
};

export const columns: ColumnDef<Order>[] = [
  {
    accessorKey: "user",
    header: "Customer",
    cell: ({ row }) => (
      <>
        <div className="font-medium">{row.original.shippingAddress.name}</div>
        <div className="hidden text-sm text-muted-foreground md:inline">
          {row.original.user.email}
        </div>
      </>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <StatusDropdown id={row.original.id} orderStatus={row.original.status} />
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Purchased date",
    cell: ({ row }) => (
      <span>{row.original.createdAt.toLocaleDateString()}</span>
    ),
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => <span>{formatPrice(row.original.amount)}</span>,
  },
];

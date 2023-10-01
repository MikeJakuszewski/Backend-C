// import Orders from "@/app/constants/orders";
import WarehouseItems from "@/app/constants/warehouseItems";

export const GET = async (req, { params }) => {
  return Response.json({ orders: WarehouseItems });
};

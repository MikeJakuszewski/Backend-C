import Orders from "@/app/constants/orders";
import WarehouseItems from "@/app/constants/warehouseItems";

// Util function to map line items with warehouse items
const mapLineItemsToWarehouseItems = (lineItems) => {
  return lineItems.map((lineItem) => {
    const warehouseItem = WarehouseItems.find(
      (warehouseItem) => warehouseItem.lineItemId === lineItem.lineItemId
    );
    return {
      ...lineItem,
      subItems: warehouseItem.subItems,
    };
  });
};

// Util function to combine data
const constructTeamData = (order) => {
  const lineItems = mapLineItemsToWarehouseItems(order.lineItems);

  const packingTeam = {
    orderDate: order.orderDate,
    lineItems,
    shippingAddress: order.shippingAddress,
    customerName: order.customerName,
  };
  const pickingTeam = {
    lineItems,
  };

  return { packingTeam, pickingTeam };
};

export const GET = async (req, { params }) => {
  const teamDataList = Orders.map((order) => constructTeamData(order));

  return Response.json({ teamDataList });
};

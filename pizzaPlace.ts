type Pizza = {
  id: number;
  name: string;
  price: number;
};

/**
 * Challenge: Add an Order type. It should have `id`, `pizza`, and `status` properties.
 * Look through the code if you need a reminder as to what data types those should be.
 */

type Order = {
  id: number;
  pizza: Pizza;
  status: "ordered" | "completed";
};

const menu: Pizza[] = [
  { id: getNextPizzaId(), name: "Margherita", price: 8 },
  { id: getNextPizzaId(), name: "Pepperoni", price: 10 },
  { id: getNextPizzaId(), name: "Hawaiian", price: 10 },
  { id: getNextPizzaId(), name: "Veggie", price: 9 },
];

let cashInRegister = 100;
let nextOrderId = 1;
let nextPizzaId: number = 0;
const orderQueue: Order[] = [];

function addNewPizza(pizzaObj: Omit<Pizza, "id">): void {
  const newPizza: Pizza = { ...pizzaObj, id: getNextPizzaId() };
  menu.push(newPizza);
}

function placeOrder(pizzaName: string): Order | undefined {
  const selectedPizza = menu.find((pizzaObj) => pizzaObj.name === pizzaName);
  if (!selectedPizza) {
    console.error(`${pizzaName} does not exist in the menu`);
    return;
  }
  cashInRegister += selectedPizza.price;
  const newOrder: Order = {
    id: nextOrderId++,
    pizza: selectedPizza,
    status: "ordered",
  };
  orderQueue.push(newOrder);
  return newOrder;
}

function completeOrder(orderId: number): Order | undefined {
  const order = orderQueue.find((order) => order.id === orderId);
  if (!order) {
    console.error(`${orderId} was not found in the order queue`);
    return;
  }
  order.status = "completed";
  cashInRegister += order.pizza.price;
  return order;
}

function getOrderQueue() {
  return orderQueue;
}

function printOrderQueue() {
  console.log("Order queue:", orderQueue);
}

function getCashInRegister() {
  return cashInRegister;
}

function getNextPizzaId(): number {
  return nextPizzaId++;
}

function getPizzaDetail(identifier: number | string): Pizza | undefined {
  if (typeof identifier === "number") {
    return menu.find((pizza) => pizza.id === identifier);
  } else if (typeof identifier === "string") {
    return menu.find(
      (pizza) => pizza.name.toLowerCase() === identifier.toLowerCase()
    );
  } else {
    throw new TypeError("Invalid identifier type");
  }
}

addNewPizza({ name: "Chicken Bacon Ranch", price: 12 });
addNewPizza({ name: "BBQ Chicken", price: 12 });
addNewPizza({ name: "Spicy Sausage", price: 11 });

placeOrder("Chicken Bacon Ranch");
completeOrder(1);

console.log("Menu:", menu);
console.log("Cash in register:", cashInRegister);
console.log("Order queue:", orderQueue);

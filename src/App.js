import React from "react";
import axios from "axios";
import Header from "./components/Header";
import Items from "./components/Items";
import Footer from "./components/Footer";
import Categories from "./components/Categories";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      currentItems: [],
      items: [], 
 
    };
    this.addToOrder = this.addToOrder.bind(this);
    this.deleteOrder = this.deleteOrder.bind(this);
    this.chooseCategory = this.chooseCategory.bind(this);
    this.handleOrderCompletion = this.handleOrderCompletion.bind(this);
    this.addItemsToAPI = this.addItemsToAPI.bind(this);  
    this.getItemsFromAPI = this.getItemsFromAPI.bind(this);
    this.clearItems = this.clearItems.bind(this);  
  }
  newItems = [
    {
      id: 1,
      title: "Маргарита",
      price: 150,
      description: "Класична піца з томатним соусом, сиром моцарела і базиліком",
      category: "Pizza",
      image: "img/margarita.jpg"
    },
    {
      id: 2,
      title: "Пепероні",
      price: 170,
      description: "Піца з томатним соусом, сиром моцарела і салямі пепероні",
      category: "Pizza",
      image: "img/pepperoni.jpg"
    },
    {
      id: 3,
      title: "Гавайська",
      price: 160,
      description: "Піца з ананасом, куркою та томатним соусом",
      category: "Pizza",
      image: "img/hawaiian.webp"
    },
    {
      id: 4,
      title: "Чотири сири",
      price: 180,
      description: "Піца з сумішшю чотирьох видів сиру: моцарела, пармезан, горгонзола, едам",
      category: "Pizza",
      image: "img/four_cheese.jpg"
    },
    {
      id: 5,
      title: "Діабло",
      price: 185,
      description: "Пікантна піца з перцем чилі, салямі та сиром",
      category: "Pizza",
      image: "img/diablo.jpg"
    },
    {
      id: 6,
      title: "Вегетаріанська",
      price: 140,
      description: "Піца з овочами, сиром моцарела і базиліком",
      category: "Pizza",
      image: "img/vegetarian.jpg"
    },
    {
      id: 7,
      title: "Борщ український",
      price: 120,
      description: "Традиційний український суп з буряком, капустою та сметаною",
      category: "Soup",
      image: "img/borsch.webp"
    },
    {
      id: 8,
      title: "Крем-суп з грибами",
      price: 140,
      description: "Ніжний крем-суп з печерицями та вершками",
      category: "Soup",
      image: "img/mushroom_soup.jpg"
    },
    {
      id: 9,
      title: "Солянка",
      price: 150,
      description: "Густий суп з м'ясом, оливками і лимоном",
      category: "Soup",
      image: "img/solyanka.png"
    },
    {
      id: 10,
      title: "Гарбузовий суп",
      price: 130,
      description: "Легкий суп з гарбуза та вершками",
      category: "Soup",
      image: "img/pumpkin_soup.jpg"
    },
    {
      id: 11,
      title: "Холодник",
      price: 110,
      description: "Холодний суп з буряком та яйцем",
      category: "Soup",
      image: "img/cold_soup.jpg"
    },
    {
      id: 12,
      title: "Том Ям",
      price: 190,
      description: "Тайський гостро-кислий суп з креветками",
      category: "Soup",
      image: "img/tom_yam.jpg"
    },
    {
      id: 13,
      title: "Філадельфія рол",
      price: 180,
      description: "Рол з лососем, сиром Філадельфія та авокадо",
      category: "Sushi",
      image: "img/filadelphia.jpg"
    },
    {
      id: 14,
      title: "Каліфорнія рол",
      price: 170,
      description: "Рол з крабовими паличками, авокадо та ікрою",
      category: "Sushi",
      image: "img/california.jpg"
    },
    {
      id: 15,
      title: "Макі рол",
      price: 120,
      description: "Класичний рол з огірком",
      category: "Sushi",
      image: "img/maki.webp"
    },
    {
      id: 16,
      title: "Темпура рол",
      price: 190,
      description: "Смажений рол з креветкою та соусом",
      category: "Sushi",
      image: "img/tempura.webp"
    },
    {
      id: 17,
      title: "Дракон рол",
      price: 200,
      description: "Рол з вугром, авокадо та унагі соусом",
      category: "Sushi",
      image: "img/dragon.png"
    },
    {
      id: 18,
      title: "Спайсі рол",
      price: 175,
      description: "Рол з тунцем і гострим соусом",
      category: "Sushi",
      image: "img/spicy.jpg"
    },
    {
      id: 19,
      title: "Карбонара",
      price: 200,
      description: "Італійська паста з беконом, яйцем, пармезаном і вершковим соусом",
      category: "Pasta",
      image: "img/karbonara.jpg"
    },
    {
      id: 20,
      title: "Болоньєзе",
      price: 210,
      description: "Паста з соусом болоньєзе на основі м'ясного фаршу та томатів",
      category: "Pasta",
      image: "img/bolognese.webp"
    },
    {
      id: 21,
      title: "Фетучіні Альфредо",
      price: 190,
      description: "Фетучіні з ніжним вершковим соусом",
      category: "Pasta",
      image: "img/alfredo.jpg"
    },
    {
      id: 22,
      title: "Паста з грибами",
      price: 195,
      description: "Паста з соусом на основі грибів",
      category: "Pasta",
      image: "img/mushroom_pasta.webp"
    },
    {
      id: 23,
      title: "Лазанья",
      price: 220,
      description: "Італійська лазанья з м'ясним соусом та сиром",
      category: "Pasta",
      image: "img/lasagna.jpg"
    },
    {
      id: 24,
      title: "Паста з морепродуктами",
      price: 230,
      description: "Паста з морепродуктами та соусом",
      category: "Pasta",
      image: "img/seafood_pasta.jfif"
    },
    {
      id: 25,
      title: "Салат Цезар",
      price: 130,
      description: "Салат з куркою, сухариками, сиром пармезан і фірмовим соусом",
      category: "Salad",
      image: "img/cesar.jpeg"
    },
    {
      id: 26,
      title: "Грецький салат",
      price: 125,
      description: "Салат з фетою, оливками, помідорами та огірками",
      category: "Salad",
      image: "img/greek_salad.jpg"
    },
    {
      id: 27,
      title: "Вінегрет",
      price: 110,
      description: "Традиційний овочевий салат з буряком",
      category: "Salad",
      image: "img/vinegret.jpg"
    },
    {
      id: 28,
      title: "Капрезе",
      price: 135,
      description: "Салат з моцарелою, томатами та базиліком",
      category: "Salad",
      image: "img/caprese.jpg"
    },
    {
      id: 29,
      title: "Салат з тунцем",
      price: 145,
      description: "Салат з тунцем та овочами",
      category: "Salad",
      image: "img/tuna_salad.webp"
    },
    {
      id: 30,
      title: "Олів'є",
      price: 120,
      description: "Традиційний святковий салат",
      category: "Salad",
      image: "img/olivier.webp"
    },
    {
      id: 31,
      title: "Чорний чай",
      price: 60,
      description: "Чорний Чай",
      category: "Drinks",
      image: "img/black_tea.png"
    },
    {
      id: 32,
      title: "Капучино",
      price: 55,
      description: "Кава з молочною пінкою",
      category: "Drinks",
      image: "img/cappuccino.jpg"
    },
    {
      id: 33,
      title: "Зелений чай",
      price: 50,
      description: "Зелений чай",
      category: "Drinks",
      image: "img/green_tea.jpg"
    },
    {
      id: 34,
      title: "Латте",
      price: 70,
      description: "Латте з молочною пінкою",
      category: "Drinks",
      image: "img/latte.jpg"
    },
    {
      id: 35,
      title: "Лимонад",
      price: 40,
      description: "Лимонад ",
      category: "Drinks",
      image: "img/lemonade.webp"
    },
    {
      id: 36,
      title: "Смузі",
      price: 30,
      description: "Смузі",
      category: "Drinks",
      image: "img/smoothie.jpg"
    }
];

  clearItems() {
    this.setState({
      items: [], 
      currentItems: [],
    });
  }
  async componentDidMount() {
    this.clearItems();
    this.addItemsToAPI(this.newItems);  
  }
  async getItemsFromAPI() {
    try {
      const response = await axios.get("https://fakestoreapi.com/products");
      this.setState({
        items: response.data, 
        currentItems: response.data,
      });
    } catch (error) {
    }
  }
  async addItemsToAPI(items) {
    try {
        const filteredItems = items.filter(newItem => 
            !this.state.items.some(existingItem => existingItem.id === newItem.id)
        );
        
        if (filteredItems.length > 0) {
            for (let item of filteredItems) {
                const response = await axios.post("https://fakestoreapi.com/products", item);
                console.log("Item added:", response.data);
            }
            this.setState(prevState => ({
                items: [...prevState.items, ...filteredItems],
                currentItems: [...prevState.items, ...filteredItems],
            }));
        }
    } catch (error) {
        console.error("Error adding items:", error);
    }
}

  render() {
    return (
      <div className="wrapper">
        <Header
          orders={this.state.orders}
          onDelete={this.deleteOrder}
          onOrder={this.handleOrderCompletion}
        />
        <Categories chooseCategory={this.chooseCategory} />
        <Items
          onShowItem={this.onShowItem}
          items={this.state.currentItems} 
          onAdd={this.addToOrder}
        />     
        <Footer />
      </div>
    );
  }
  chooseCategory(category) {
    if (category === "all") {
        this.setState({
            currentItems: [...new Set(this.state.items)], 
        });
    } else {
        const filteredItems = this.state.items.filter((el) => el.category === category);
        this.setState({
            currentItems: [...new Set(filteredItems)]  
        });
    }
}


  
  deleteOrder(id) {
    this.setState({
      orders: this.state.orders.filter((el) => el.id !== id),
    });
  }
  addToOrder(item) {
    let isInArray = false;
    this.state.orders.forEach((el) => {
      if (el.id === item.id) isInArray = true;
    });
    if (!isInArray) {
      this.setState({ orders: [...this.state.orders, item] });
    }
  }
  handleOrderCompletion() {
    alert("Замовлення успішно оформлено!");
    this.setState({ orders: [] });
  }
}
export default App;
import React, { Component } from 'react'
export class Categories extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: [
                { key: "all", name: "Всі" },
                { key: "Pizza", name: "Піца" },
                { key: "Soup", name: "Супи" },
                { key: "Sushi", name: "Суші" },
                { key: "Pasta", name: "Паста" },
                { key: "Salad", name: "Салати" },
                { key: "Drinks", name: "Напої" }
            ]
        };
    }

    render() {
        return (
            <div className='categories'>
                {this.state.categories.map(el => (
                    <div
                        key={el.key}
                        onClick={() => this.props.chooseCategory(el.key)}
                    >
                        {el.name}
                    </div>
                ))}
            </div>
        );
    }
}

export default Categories;

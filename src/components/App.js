import React from "react";
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import sampleFishes from '../sample-fishes';
import Fish from './Fish';
import base from '../base';

class App extends React.Component {
    state = {
        fishes: {

        },
        order: {}
    };

    componentDidMount(){
        // const { params } = this.props.match;
        // this.ref = base.syncState(`${this.props.match.params.storeId}/fishes`, {
        //     context: this,
        //     state: 'fishes'
        // }); ^ that didnt work -- because i didnt comment out params const?

        //first reinstate our localStorage (componentDidUpdate) below
        const localStorageRef = localStorage.getItem(this.props.match.params.storeID);
        if(localStorageRef){
            this.setState({ order: JSON.parse(localStorageRef)})
        }

        this.ref = base.syncState(`${this.props.match.params.storeID}/fishes`, {
            // sync takes an object
            context: this,
            state: 'fishes'
        });
    }

    componentDidUpdate(){
        localStorage.setItem(this.props.match.params.storeID, 
            JSON.stringify(this.state.order));
    }

    componentWillUnmount(){
        base.removeBinding(this.ref);
    }

    addFish = (fish) => {
        // 1. Take a copy of the existing state -- otherwise you are modifying it 
        // directly, and would be a mutation
        const fishes = {...this.state.fishes};
        // 2. Add our new fish to fishes variable
        fishes[`fish${Date.now()}`] = fish;
        // 3. Set the new fishes object to state.

        this.setState({
            fishes: fishes // lol what the fuck is this
        });


    };

    deleteFish = key => {

        //1. take a copy of state

        const fishes = {...this.state.fishes };

        // 2. update the sate
        fishes[key] = null;

        // 3. update state

        this.setState({fishes: fishes});
    };

    updateFish = (key, updatedFish) => {
        // 1. take a copy of the current state
        const fishes = {...this.state.fishes };
        // 2. update that state

        fishes[key] = updatedFish;

        // 3. set that to state

        this.setState({fishes : fishes});
    };

    removeFromOrder = key => {

        //1. take a copy of state

        const order = {...this.state.order };

        // 2. update the sate
        delete order[key];

        // 3. update state

        this.setState({order: order});
    };

    

    loadSampleFishes = () => {
        this.setState({ fishes: sampleFishes});

    };

    addToOrder = (key) => {
        // 1. take a copy of state
        const order = {...this.state.order };
        // 2. either add to the order, or update the number in our order
        order[key] = order[key] + 1 || 1;
        // 3. Call setState to update our state object
        this.setState({order});
    }

    render(){
        return (
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header tagline="Fresh Seafood Market" />
                    <ul className="fishes">
                        {Object.keys(this.state.fishes).map(key => 
                        <Fish
                         key={key}
                         index={key} 
                        details={this.state.fishes[key]} 
                        addToOrder={this.addToOrder}/>)}
                    </ul>
                    
                </div>
                <Order 
                fishes = {this.state.fishes} order = {this.state.order}
                removeFromOrder = {this.removeFromOrder}
                />
                <Inventory 
                addFish={this.addFish}
                updateFish={this.updateFish}
                deleteFish={this.deleteFish}
                loadSampleFishes={this.loadSampleFishes}
                fishes={this.state.fishes}
                storeID={this.props.match.params.storeID}
                />
               
            </div>
        );
    }
}

export default App;
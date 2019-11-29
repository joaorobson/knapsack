import React from "react";
import {
  Button,
  Divider,
  Grid,
  Form,
  List,
  Header,
  Table
} from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

class Knapsack extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [
        { id: 1, mass: 6, value: 10 },
        { id: 2, mass: 1, value: 5 },
        { id: 3, mass: 2, value: 7 },
        { id: 4, mass: 5, value: 12 },
        { id: 5, mass: 4, value: 8 },
        { id: 6, mass: 3, value: 6 }
      ]
    };
  }

  addItem() {
    let items = this.state.items;
    let mass = parseInt(this.state.mass);
    let value = parseInt(this.state.value);
    let minWeight =
      this.state.weightLimit > mass ? mass : this.state.weightLimit;
    items.push({
      id: this.state.items.length + 1,
      mass: mass,
      value: value
    });

    this.setState({ items: items, weightLimit: minWeight });
  }

  removeItem(id) {
    this.setState(prevState => ({
      items: prevState.items.filter(el => el.id !== id)
    }));
  }

  generateDP() {
    this.setState({ showDP: true });
  }

  mountTableHeader() {
    return (
      <Table.Row>
        <Table.HeaderCell />
        {[...Array(this.state.weightLimit + 1).keys()].map(v => {
          return <Table.HeaderCell>{v}</Table.HeaderCell>;
        })}
      </Table.Row>
    );
  }

  mountRows() {
    var weightList = this.state.items.map((x) => x['mass']);
    var valueList = this.state.items.map((x) => x['value']);
    var CostTable = this.dynamicKnapsack(this.state.weightLimit, this.state.items.length, weightList, valueList);

    return this.state.items.map((i, ix) => {
      return (
        <Table.Row>
          <Table.Cell width={1}>Item {ix + 1}</Table.Cell>
          {CostTable[ix].map((j, jx) => {
            return (ix === this.state.items.length - 1 && jx === this.state.weightLimit) ? <Table.Cell style={{backgroundColor: "#8ce885"}}>{j}</Table.Cell> : <Table.Cell>{j}</Table.Cell>
          })}
        </Table.Row>
      );
    });
  }

  dynamicKnapsack(total_weight, item_count, Weight, Benefit){
    let CostTable = []

    for(var i=0; i < Weight.length; i++){
      CostTable.push(Array(total_weight + 1).fill(0));
    }

    for(i = 0; i < item_count; ++i){
      CostTable[i][0] = 0;

      for(var w = 0; w <= total_weight; ++w){
        if(i === 0){
          if(w >= Weight[i]){
            CostTable[i][w] = Benefit[i];
          }
        } else if(Weight[i] <= w){
            CostTable[i][w] = Math.max(Benefit[i] + CostTable[i-1][w - Weight[i]], CostTable[i-1][w])
        } else{
            CostTable[i][w] = CostTable[i-1][w]
        }
      }
    }
    return CostTable;
  }

  mountDPMatrix() {
    return (
      <Table textAlign="center" definition>
        <Table.Header>{this.mountTableHeader()}</Table.Header>

        <Table.Body>{this.mountRows()}</Table.Body>
      </Table>
    );
  }

  itemsList() {
    return (
      <List celled ordered>
        {this.state.items.map(item => (
          <List.Item>
            <Button
              onClick={() => this.removeItem(item.id)}
              color="red"
              floated="right"
            >
              Remover
            </Button>
            <List.Content>
              <List.Description>
                <b>Massa:</b> {item.mass}
              </List.Description>
              <List.Description>
                <b>Valor:</b> {item.value}
              </List.Description>
            </List.Content>
          </List.Item>
        ))}
      </List>
    );
  }

  getWeightLimit() {
    if (!this.state.weightLimit) {
      let minMass = Math.min.apply(
        Math,
        this.state.items.map(o => o.mass)
      );
      this.setState({ weightLimit: minMass });
    }
    let minMass = this.state.weightLimit;

    return minMass;
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  showTitle() {
    setTimeout(() => {
      this.setState(prevState => ({
        color: "red",
        colorSetted: true
      }));
    }, 2000);
  }

  componentDidUpdate() {
    if (this.state.showDP && !this.state.colorSetted) {
      this.showTitle();
    }
  }

  setWeightLimit(weightLimit){
    this.setState({weightLimit: parseInt(this.state.limit)})
  }

  render() {
    return (
      <Grid columns="equal" style={{ margin: "40px" }}>
        <Header>Knapsack</Header>
        <Grid.Row>
          <Grid.Column>
            <Form>
              <Form.Group widths="equal">
                <Form.Input
                  name="mass"
                  onChange={this.handleChange}
                  type="number"
                  min="0"
                  fluid
                  placeholder="Insira a massa do item"
                />
                <Form.Input
                  name="value"
                  onChange={this.handleChange}
                  type="number"
                  min="0"
                  fluid
                  placeholder="Insira o valor do item"
                />
              </Form.Group>
              <Form.Button
                onClick={this.addItem.bind(this)}
                disabled={!this.state.value || !this.state.mass}
              >
                Adicionar item à mochila
              </Form.Button>
              <Divider hidden />
            </Form>
            <Form>
              <Form.Group widths="equal">
                <Form.Input
                  name="limit"
                  onChange={this.handleChange}
                  type="number"
                  min="0"
                  fluid
                  placeholder="Insira o valor do limite de peso"
                />
              </Form.Group>
              <Form.Button
                onClick={() => this.setWeightLimit()}
                disabled={!this.state.limit}
              >
                Setar peso
              </Form.Button>
            </Form>
          </Grid.Column>
          <Grid.Column>
            <p>Limite de peso: {this.getWeightLimit()}</p>
            {this.itemsList()}
          </Grid.Column>
          <Button style={{ height: "114px" }} onClick={() => this.generateDP()}>
            Mostrar DP
          </Button>
          {this.state.showDP && this.mountDPMatrix()}
        </Grid.Row>
      </Grid>
    );
  }
}

export default Knapsack;

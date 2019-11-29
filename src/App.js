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
        { id: 1, mass: 2, value: 1 },
        { id: 2, mass: 5, value: 3 }
      ]
    };
  }

  addItem() {
    let items = this.state.items;
    let mass = parseInt(this.state.mass);
    let value = parseInt(this.state.value);
    let minWeight =
      this.state.weightLimit > mass ? mass : this.state.weightLimit;
    console.log("oooo", minWeight);
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

  getDPValues(ix) {
    return [
      [1, 2, 3],
      [4, 5, 6]
    ][ix];
  }

  mountRows() {
    return this.state.items.map((i, ix) => {
      return (
        <Table.Row>
          <Table.Cell width={1}>Item {ix + 1}</Table.Cell>
          {this.getDPValues(ix).map(j => (
            <Table.Cell>{j}</Table.Cell>
          ))}
        </Table.Row>
      );
    });
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
    console.log(this.state);
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
                onClick={this.addItem.bind(this)}
                disabled={!this.state.limit}
              >
                Adicionar item à mochila
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

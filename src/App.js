import React from "react";
import { Button, Grid, Form, List, Header, Image } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

class Knapsack extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [
        { id: 1, mass: 42, value: 1 },
        { id: 2, mass: 45, value: 3 }
      ]
    };
  }

  addItem() {
    let items = this.state.items;
    items.push({
      id: this.state.items.length + 1,
      mass: this.state.mass,
      value: this.state.value
    });

    this.setState({ items: items });
  }

  removeItem(id) {
    this.setState(prevState => ({
      items: prevState.items.filter(el => el.id != id)
    }));
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

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

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
            </Form>
          </Grid.Column>
          <Grid.Column>{this.itemsList()}</Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default Knapsack;

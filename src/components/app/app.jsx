import React, { Component } from 'react';

// models
import locationModel from '../../models/location-model';

// components
import EmojiDisplay from '../emoji-display/emoji-display.jsx';

// styles
require('./app.scss');


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isComponentMounted: false,
    };

    locationModel.init();

    window.addEventListener(
      'hashchange',
      this.onHashChanged.bind(this),
      false
    );
  }


  // react methods definitions
  render() {
    return (
      <div className="app">
        <header>
          <div className="centered">
            <div className="title">Fruit or Veggie</div>
            <div className="description">Test with URL hash</div>
          </div>
        </header>

        <div className="centered">
          <section>
            <nav>
              <ul className="top-level-nav">
                <li>
                  <a
                    className="btn-primary btn-top-level"
                    href="#/fruits"
                  >Fruits</a>
                  <ul className="sub-nav">
                    <li>
                      <a
                        className="btn-primary"
                        href="#/fruits/apple"
                      >Apple</a>
                    </li>
                    <li>
                      <a
                        className="btn-primary"
                        href="#/fruits/orange"
                      >Orange</a>
                    </li>
                    <li>
                      <a
                        className="btn-primary"
                        href="#/fruits/peach"
                      >Peach</a>
                    </li>
                    <li>
                      <a
                        className="btn-primary"
                        href="#/fruits/pear"
                      >Pear</a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a
                    className="btn-primary btn-top-level"
                    href="#/veggies"
                  >Veggies</a>
                  <ul className="sub-nav">
                    <li>
                      <a
                        className="btn-primary"
                        href="#/veggies/tomato"
                      >Tomato</a>
                    </li>
                    <li>
                      <a
                        className="btn-primary"
                        href="#/veggies/eggplant"
                      >Eggplant</a>
                    </li>
                    <li>
                      <a
                        className="btn-primary"
                        href="#/veggies/avocado"
                      >Avocado</a>
                    </li>
                    <li>
                      <a
                        className="btn-primary"
                        href="#/veggies/potato"
                      >Potato</a>
                    </li>
                  </ul>
                </li>
              </ul>
            </nav>
            <hr/>
          </section>

          <section>
            <EmojiDisplay />
            <hr/>
          </section>
        </div>

        <footer>
          <div className="centered">
          <div className="title">Fruit or Veggie</div>
          <div className="description">Test with URL hash</div>
          </div>
        </footer>
      </div>
    );
  }

  componentDidMount() {
    this.setState({
      isComponentMounted: true
    });
  }


  // methods definitions
  onHashChanged() {
    locationModel.parseHash();
  }

  update() {
    if (!this.state.isComponentMounted) {
      return;
    }

    this.forceUpdate();
  }
}
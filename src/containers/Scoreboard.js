import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import * as PlayerActionCreator from '../actions/player';
import { connect } from 'react-redux';

// Components
import AddPlayerForm from '../components/AddPlayerForm';
import Player from '../components/Player';
import Header from '../components/Header';


class Scoreboard extends Component {

  static propTypes = {
    players: PropTypes.array.isRequired
  }

  render() {

    const { dispatch, players } = this.props;

    const addPlayer = bindActionCreators(PlayerActionCreator.addPlayer, dispatch);
    const removePlayer = bindActionCreators(PlayerActionCreator.removePlayer, dispatch);
    const updatePlayerScore = bindActionCreators(PlayerActionCreator.updatePlayerScore, dispatch);

    const playerComponents = players.map((player, index) => {
      return (
        <Player
          index={index}
          name={player.name}
          score={player.score}
          key={player.name}
          updatePlayerScore={updatePlayerScore}
          removePlayer={removePlayer}
        />
      );
    });

    return (
      <div className="scoreboard" >
        <Header players={players} />
        <div className="players">
          {playerComponents}
        </div>
        <AddPlayerForm addPlayer={addPlayer} />
      </div>
    );
  }
}

const mapStateToProps = state => (
  {
    players: state
  }
);

export default connect(mapStateToProps)(Scoreboard);
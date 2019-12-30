import React from 'react';
import { Grid, List } from "antd-mobile";
import PropTypes from 'prop-types';

class AvatarSelector extends React.Component {
  static propTypes = {
    selectAvatar: PropTypes.func.isRequired
  }
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const avatarList = "boy,girl,man,woman,chick,crab,hedgehog,hippopotamus,koala,lemur,pig,tiger,whale,bull,zebra"
      .split(",")
      .map(v => ({
        icon: require(`../img/${v}.png`),
        text: v
      }));
    const gridHeader = this.state.text ? (
      <div>
        <span>已选择头像</span>
        <img style={{ width: 20 }} src={this.state.icon} alt=""></img>
      </div>
    ) : (
      "请选择头像"
    );
    return (
      <div>
        <List renderHeader={() => gridHeader}></List>
        <Grid
          data={avatarList}
          activeStyle={false}
          columnNum={5}
          onClick={ele => {
            this.setState(ele);
            this.props.selectAvatar(ele.text);
          }}
        />
        头像选择
      </div>
    );
  }
}

export default AvatarSelector;
import { connect } from 'react-redux';

import { Queue } from '../components/queue';
import { get as getQueue, remove as removeItem, set as setQueue, addVote } from 'modules/queue/actions';

const mapStateToProps = (state) => {
  return {
    queue: state.queue,
    userId: state.user && state.user.id
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getQueue: () => { dispatch(getQueue()) },
    removeVideo: (item) => { dispatch(removeItem(item)) },
    setQueue: (queue) => { dispatch(setQueue(queue)) },
    addVote: (item, userId) => { dispatch(addVote(item, userId)) }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Queue);

import {
  checkHasPseudoEle,
} from '../util';
import {
  PSEUDO_CLASS,
  TRANSPARENT_CLASS,
} from '../constants';

const pseudoHandler = (node, options) => {
  if (!node.tagName) return;

  const pseudo = checkHasPseudoEle(node);

  if (!pseudo || !pseudo.ele) return;

  const { ele, width } = pseudo;

  // Width is less than the hiding threshold
  if (width < options.minGrayPseudoWidth) {
    ele.classList.add(TRANSPARENT_CLASS);
    return;
  }

  ele.classList.add(PSEUDO_CLASS);
};

export default pseudoHandler;

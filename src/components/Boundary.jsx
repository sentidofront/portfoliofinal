import { Component } from 'react';

/* WebGL is not guaranteed. Hardware acceleration switched off, a locked-down
   work machine, a low-end phone that refuses another context, or a browser that
   has already handed out too many of them all make <Canvas> throw. React has no
   default for that: the error walks up the tree and unmounts everything, so the
   visitor gets a blank page instead of the site.

   Everything outside the canvas is DOM and CSS, so losing the 3D layer costs
   atmosphere and nothing else. */
export default class Boundary extends Component {
  constructor(props) {
    super(props);
    this.state = { failed: false };
  }

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error) {
    if (import.meta.env.DEV) {
      console.warn('[Boundary] 3D layer disabled:', (error && error.message) || error);
    }
  }

  render() {
    return this.state.failed ? this.props.fallback ?? null : this.props.children;
  }
}

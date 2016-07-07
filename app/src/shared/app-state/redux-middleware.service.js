export const logging = () => next => action => {
  if (NODE_ENV !== 'production') {
    console.info('Dispatched action: %s', action.type, action);
  }
  return next(action);
};

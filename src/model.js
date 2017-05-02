import xs from 'xstream';

export default function model(action$) {
  const initialReducer$ = xs.of(() => ({
    channels: [{name:'fcc', online: true}], filterFn: () => true
  }));

  const filterOnlineReducer$ = action$
    .filter(ac => ac.type === 'filterOnline')
    .map(action => (prevState) => {
      return {
        ...prevState,
        filterFn: (channel) => channel.online === true
      }
    });

  const filterOfflineReducer$ = action$
    .filter(ac => ac.type === 'filterOffline')
    .map(action => (prevState) => {
      return {
        ...prevState,
        filterFn: (channel) => channel.online === false
      }
    });

  const filterAllReducer$ = action$
    .filter(ac => ac.type === 'filterAll')
    .map(action => (prevState) => {
      return {
        ...prevState,
        filterFn: () => true
      }
    });

  return xs.merge(
    initialReducer$,
    filterOfflineReducer$,
    filterOnlineReducer$,
    filterAllReducer$
  );

}
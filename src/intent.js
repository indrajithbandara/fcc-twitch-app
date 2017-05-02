import xs from 'xstream';

export default function intent(domSource) {
  const filterOnlineAction$ = domSource
    .select('.filter-online').events('change')
    .map(ev => ev.target.checked)
    .map(payload => ({type: 'filterOnline', payload}));

  const filterOfflineAction$ = domSource
    .select('.filter-offline').events('change')
    .map(ev => ev.target.checked)
    .map(payload => ({type: 'filterOffline', payload}));

  const filterAllAction$ = domSource
    .select('.filter-all').events('change')
    .map(ev => ev.target.checked)
    .map(payload => ({type: 'filterAll', payload}));

  return xs.merge(
    filterOnlineAction$,
    filterOfflineAction$,
    filterAllAction$
  );
}
import xs from 'xstream';
import intent from './intent';
import model from './model';
import {html} from 'snabbdom-jsx';

export default function app(sources) {
  const state$ = sources.onion.state$;
  const action$ = intent(sources.DOM);
  const reducer$ = model(action$);

  const vdom$ = state$.map(state =>
    <div>
      <form>
        <fieldset>
          <legend>What is Your Favorite Pet?</legend>
          <input className="filter-all" type="radio" name="status" value="All" checked="true"/>All<br />
          <input className="filter-online" type="radio" name="status" value="Online" />Online<br />
          <input className="filter-offline" type="radio" name="status" value="Offline" />Offline<br />
        </fieldset>
      </form>
      {
        state.channels.filter(state.filterFn).map(channel =>
        <div>
            <span>{channel.name}</span>
            <span>{channel.online}</span>
        </div>
        )
      }
    </div>
  );

  return {
    DOM: vdom$,
    onion: reducer$
  };
}

// configureHistory.js
import { createBrowserHistory, createHashHistory } from 'history'

export default function configureHistory() {
    console.log("configuer Historu");
    var history = window.matchMedia('(display-mode: standalone)').matches ? "Hash": "Browser";
    console.log(history);
  return window.matchMedia('(display-mode: standalone)').matches
    ? createHashHistory()
    : createBrowserHistory()
}
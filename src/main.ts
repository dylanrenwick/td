import './style.css'
import { buildScene } from './scene'
import { App } from './canvite/App'

const app = new App('canv')

buildScene(app)

app.start()

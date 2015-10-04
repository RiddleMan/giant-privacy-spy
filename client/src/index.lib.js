import 'babel-core/polyfill';
import dal from './dal';
import templateDefault from './components/templates/DefaultGo';
import templatePerfMonitor from './components/templates/PerfMonitorGo';
import { settings as MainDiagramSettings } from './components/MainDiagramGo';
import { settings as MainPaletteSettings, goModel as MainPaletteModel } from './components/MainDiagramGo';

export default {
    dal,
    go: {
        templates: [templateDefault, templatePerfMonitor],
        diagram: {
            settings: MainDiagramSettings
        },
        palette: {
            settings: MainPaletteSettings,
            model: MainPaletteModel
        }
    }
};

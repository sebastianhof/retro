import {ActModel, SenseModel, ConfigurationModel} from '../models/commandModel';

export interface IDevice {
    id: string

    act(act:ActModel, done)

    sense(sense:SenseModel, done)

    configure(configuration:ConfigurationModel, done)

    onRegister()

    onUnregister()
}
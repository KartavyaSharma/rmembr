import { IState, StateType } from "../../../models/db/planner_models/subsections";
/**
 * Class representing the current state for a subsection.
 */

export default class State {

    /** Initializes a state object. */
    constructor(stateType?: StateType) {
        this._color = this._stateColors[stateType] || this._stateColors[StateType.NOT_STARTED];
    }

    /** Returns an object for this state instance. */
    public get object(): IState {
        return {
            color: this._color,
        }
    }

    /** Color from the given state. */
    private _color: string;

    /** Color based on StateType values. */
    private _stateColors: { [type: string]: string } = {
        'not_started': '#ffffff',
        'warning': '#ffc107',
        'overdue': '#f44336',
        'done': '#4caf50'
    }
}
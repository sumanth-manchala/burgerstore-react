import * as actionTypes from '../actions/actionTypes';
import reducer from './auth';

describe('Auth reducer', () => {

    it('Should return initial State when no actionType found', () => {
        expect(reducer(undefined, {})).toEqual({
            token: null,
            userId: null,
            error: null,
            loading: false,
            authRedirectPath: '/'
        });
    });

    it('Should contain token when success actionType found', () => {
        expect(reducer({
            token: null,
            userId: null,
            error: null,
            loading: false,
            authRedirectPath: '/'
        },{
            type: actionTypes.AUTH_SUCCESS,
            idToken: 'some-token',
            userId: 'some-Id',
        })).toEqual({
            token: 'some-token',
            userId: 'some-Id',
            error: null,
            loading: false,
            authRedirectPath: '/'
        });
    });

});
import axios from 'axios';

class Lifx{
    constructor(auth_token) {
        this.auth_token = auth_token;
    }

    async ListLights(selector = '') {
        try {
            //check parameters first
            parameterChecks(selector);

            var request = ('lights/' + selector)

            var response = await axiosGet(request, this.auth_token);
            return response;
        } catch (error) {
            // return full error
            throw error;
        };
    };

    async SetState(selector = '', power = '', color = undefined, brightness = undefined, duration = 1.0, infared = undefined, fast = false) {
        try {
            //check parameters first
            parameterChecks(selector, power);

            //set vars
            var request = ('lights/' + selector + '/state');
            var data = {
                'power': power,
                'color': color,
                'brightness': brightness,
                'duration': duration,
                'infared': infared,
                'fast': fast
            };

            var response = await axiosPut(request, data, this.auth_token);
            return response;
        } catch (error) {
            // return full error
            throw error;
        };
    };

    async TogglePower(selector = '', duration = 1.0) {
        try {
            //check parameters first
            parameterChecks(selector);

            var request = ('lights/' + selector + '/toggle');
            var data = {
                'duration': duration
            };

            var response = await axiosPost(request, data, this.auth_token);
            return response;
        } catch (error) {
            // return full error
            throw error;
        };
    };

    async ListScenes() {
        try {
            //check parameters first
            //parameterChecks(selector);
            //no params to check

            var request = ('scenes');

            var response = await axiosGet(request, this.auth_token);
            return response;
        } catch (error) {
            // return full error
            throw error;
        };
    };

    async ActivateScene(selector = '', duration = 1.0, ignore = [], overrides = undefined, fast = false) {
        try {
            //check parameters first
            parameterChecks(selector);

            var request = ('scenes/' + selector + '/activate');
            var data = {
                'ignore': ignore,
                'duration': duration,
                'overrides': overrides,
                'fast': fast
            };

            var response = await axiosPut(request, data, this.auth_token);
            return response;
        } catch (error) {
            // return full error
            throw error;
        };
    };
};

/*======================
===PRIVATE FUNCTIONS===
=======================*/

// Axios GET function
async function axiosGet(request, auth_token) {
    try {
        var response = await axios.get(request, {
            headers: {
                'Authorization': 'Bearer ' + auth_token
            },
            baseURL: 'https://api.lifx.com/v1/'
        });
        // return the full response
        return response;
    } catch (error) {
        // return full error
        throw error;

    };
};

// Axios PUT function
async function axiosPut(request, data, auth_token) {
    try {
        var response = await axios.put(request, data,
            {
                headers: {
                    'Authorization': 'Bearer ' + auth_token
                },
                baseURL: 'https://api.lifx.com/v1/'
            });
        // return the full response
        return response;
    } catch (error) {
        // return full error
        throw error;
    };
};

// Axios POST function
async function axiosPost(request, data, auth_token) {
    try {
        var response = await axios.post(request, data,
            {
                headers: {
                    'Authorization': 'Bearer ' + auth_token
                },
                baseURL: 'https://api.lifx.com/v1/'
            });
        // return the full response
        return response;
    } catch (error) {
        // return full error
        throw error;
    };
};

function parameterChecks(selector = null, power = null) {
    // parameter checks
    if (selector === '' || undefined) {
        throw "Selector paramater not defined: selector (string) = 'all', 'label:[value]', 'id:[value]', 'group_id:[value]', etc... see https://api.developer.lifx.com/docs/selectors"
    }
    else if (typeof selector !== 'string') {
        throw "Selector paramater not string type: selector (string) = 'all', 'label:[value]', 'id:[value]', 'group_id:[value]', etc... see https://api.developer.lifx.com/docs/selectors"
    }
    else if (power == '' || undefined) {
        throw "Power paramater not defined: power (string) = on, off ... The power state you want to set on the selector. "
    }
};

export default Lifx;

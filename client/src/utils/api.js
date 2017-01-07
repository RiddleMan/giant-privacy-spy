import param from 'jquery-param';

const LOGIN = __API_URL__ + 'auth/login';
const AUTH = __API_URL__ + 'auth';

const GET_BOXES = __API_URL__ + 'api/media/boxes';
const GET_UNBOXED = __API_URL__ + 'api/media';
const GET_FILE_STATIC = __API_URL__ + 'api/media/static/';
const FILE_UPLOAD_PATH = __API_URL__ + 'api/media';

const TRACK_UPLOAD_PATH = __API_URL__ + 'api/tracks';
const GET_TAGS_PATH = __API_URL__ + 'api/tags';

const getRequest = (options = {}) => {
    return {
        headers: {
            'Content-Type': 'application/json'
        },
        mode: 'cors',
        ...options
    };
};

const getAuthorizedRequest = (options) => {
    const base = {
        ...getRequest(options),
        headers: {
            Authorization: `Bearer ${options.token}`
        }
    };

    if(!(options.body instanceof FormData))
        base.headers['Content-Type'] = 'application/json';

    return base;
};

export const getBoxes = ({
    token,
    filter = {}
}) => {
    const _filter = {
        // startPos: [15.7248938, 50.7610163],
        // endPos: [15.7746993, 50.7914159],
        // after: '2015-09-26 05:51:26.000Z',
        // before: '2015-09-26 07:51:26.000Z',
        // extensions: ['.jpg', '.pdf'],
        ...filter
    };

    const params = param(_filter);

    return fetch(`${GET_BOXES}?${params}`, getAuthorizedRequest({
        token
    }));
};

export const getFiles = ({
    token,
    page,
    box,
    sort = '-_createDate',
    size,
    filter = {}
}) => {
    const params = param({
        ...filter,
        box,
        page,
        sort,
        size
    });

    return fetch(`${GET_UNBOXED}?${params}`, getAuthorizedRequest({
        token
    }));
};

export const uploadFile = ({
    token,
    file
}) => {
    const fd = new FormData();
    fd.append('file', file, file.name);

    return fetch(FILE_UPLOAD_PATH, getAuthorizedRequest({
        method: 'POST',
        body: fd,
        token
    }));
};

export const uploadTrack = ({
    token,
    file
}) => {
    const fd = new FormData();
    fd.append('file', file);

    return fetch(TRACK_UPLOAD_PATH, getAuthorizedRequest({
        method: 'POST',
        body: fd,
        token
    }));
};

export const login = ({
    user,
    password
}) => {
    return fetch(LOGIN, getRequest({
        method: 'POST',
        body: JSON.stringify({
            user,
            password
        })
    }));
};

export const getFile = ({
    token,
    id,
    box,
    sort = '-_createDate',
    filter = {}
}) => {
    const params = param({
        ...filter,
        box,
        sort
    });

    return fetch(`${GET_UNBOXED}/${id}?${params}`, getAuthorizedRequest({
        token
    }));
};

export const getAllTags = (token) => {
    return fetch(GET_TAGS_PATH, getAuthorizedRequest({
        token
    }))
    .then((r) => r.json())
    .then((tags) => tags.map((t) => t.name));
};

export const updateFile = ({
    token,
    _id,
    update
}) => {
    return fetch(GET_UNBOXED, getAuthorizedRequest({
        method: 'PUT',
        body: JSON.stringify({
            _id,
            ...update
        }),
        token
    }));
};

export const removeFile = ({
    token,
    id
}) => {
    return fetch(`${GET_UNBOXED}/${id}`, getAuthorizedRequest({
        method: 'DELETE',
        token
    }));
};

export const getFileUrl = (fileId) => `${GET_FILE_STATIC}${fileId}`;

export const getUserInfo = (token) => {
    return fetch(AUTH, getAuthorizedRequest({
        token
    }))
    .then((r) => r.json());
};

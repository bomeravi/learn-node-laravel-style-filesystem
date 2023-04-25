import axios from "axios";
import config from "config";

// let api = axios;
let api = axios.create({
	baseURL: config.API_HOST,
});

const url = {
	auth_client: "/api/client",
    diary: "/api/v1/diary",
	image: "/api/imageUpload",
	contact_message: "/api/contactMessage",
	dashboard: "/api/dashboard",
};

const parse_res = (api) =>
	new Promise((resolve, reject) => {
		api.then((res) => resolve(res.data)).catch((err) => reject(err));
	});

const generateParams = (params) => {
	let query = "";
	if (params) {
	}
	return query;
};

export default {
	baseAxios: api,
	dashbaord: {
		countService: () => parse_res(api.get(`${url.dashbaord}/count`)),
	},
	image: {
		upload: (image) => parse_res(api.post(`${url.image}/upload`, image)),
		delete: (fileName) => parse_res(api.delete(`${url.image}/${fileName}`)),
	},
	auth: {
		googleLogin: (tokenId) =>
			api.post(`${url.auth_client}/google-login`, {
				tokenId,
			}),
		facebookLogin: (accessToken, userId) =>
			api.post(`${url.auth_client}/facebook-login`, {
				accessToken,
				userId,
			}),
		authenticate: (user) => api.post(`${url.auth_client}/login`, user),
		register: (user) => api.post(`${url.auth_client}/register`, user),
		current: () => parse_res(api.get(`${url.auth_client}/current`)),
		forgetPassword: (emailOrUsername) =>
			parse_res(
				api.get(`${url.auth_client}/forget-password/${emailOrUsername}`)
			),
		forgetUsername: (email) =>
			parse_res(api.get(`${url.auth_client}/forget-username/${email}`)),
		validatePIN: (emailOrUsername, PIN) =>
			parse_res(
				api.get(`${url.auth_client}/validate-pin/${emailOrUsername}/${PIN}`)
			),
		resetPassword: (password, token) => {
			const headers = {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			};
			return parse_res(
				api.post(
					`${url.auth_client}/reset-password/`,
					{
						password,
					},
					{
						headers,
					}
				)
			);
		},
		resendEmailConfirmationLink: () =>
			parse_res(api.get(`${url.auth_client}/resend-email-confirmation-link`)),
		validateEmailConfirmationLink: (token) =>
			parse_res(api.get(`${url.auth_client}/verify-email-from-token/${token}`)),
	},
	
	rsvp_product: {
		read: (itemId) => parse_res(api.get(`${url.rsvp_product}/id/${itemId}`)),
		readAll: () => parse_res(api.get(`${url.rsvp_product}/`)),
		reach: (data) => parse_res(api.post(`${url.contact_message}/`, data)),
	},
	rsvp_order: {
		reach: (data) => parse_res(api.post(`${url.rsvp_order}/`, data)),
	},
	community: {
		readAll: () =>
			parse_res(api.get(`${url.community}/question-list-with-count-answer`)),
		postQuestion: (data) => parse_res(api.post(`${url.community}/`, data)),
		postAnswer: (data) =>
			parse_res(api.post(`${url.community}/threadAnswer`, data)),
		readThread: (threadId) =>
			parse_res(api.get(`${url.community}/thread-question/${threadId}`)),
		readReplies: (threadId) =>
			parse_res(api.get(`${url.community}/thread-replies/${threadId}`)),
	},
	jobs: {
		read: (itemId) => parse_res(api.get(`${url.jobs}/id/${itemId}`)),
		readAll: () => parse_res(api.get(`${url.jobs}/`)),
	},
	jobs_application: {
		apply: (data) => parse_res(api.post(`${url.jobs_application}/`, data)),
	},
	retailer_and_wholesale: {
		read: (itemId) =>
			parse_res(api.get(`${url.retailer_and_wholesale}/id/${itemId}`)),
		readAll: () => parse_res(api.get(`${url.retailer_and_wholesale}/`)),
	},
	saveContactMessage: (message) =>
		parse_res(api.post(`${url.contact_message}/`, message)),
};

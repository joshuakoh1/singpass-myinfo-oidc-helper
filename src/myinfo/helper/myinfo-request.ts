import * as nonceFactory from "nonce";
import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios-https-proxy-fix";
import { SigningUtil } from "../../util";
import { createClient } from "../../client";

const AUTH_PREFIX = "apex_l2_eg";
const TIMEOUT = 20000;

export interface MyInfoRequestConstructor {
	realm: string;
	appId: string;
	privateKeyContent: string;
	privateKeyPassword: string;
	version: "v2" | "v3";
}

/**
 * For most cases, myinfo-helper will suffice.
 * This class is used only for special MyInfo endpoints.
 * Request class for MyInfo endpoints other than those defined in MyInfoHelper
 */
export class MyInfoRequest {
	private readonly axiosClient: AxiosInstance;
	private readonly realm: string;
	private readonly appId: string;
	private readonly privateKeyContent: string;
	private readonly privateKeyPassword: string;
	private readonly version: "v2" | "v3";

	constructor(props: MyInfoRequestConstructor) {
		this.axiosClient = createClient({
			timeout: 10000,
		});
		this.realm = props.realm;
		this.appId = props.appId;
		this.privateKeyContent = props.privateKeyContent;
		this.privateKeyPassword = props.privateKeyPassword;
		this.version = props.version || "v3";
	}

	public async get(
		uri: string,
		queryParams?: { [key: string]: any },
		bearer?: string,
	): Promise<AxiosResponse> {

		let authHeader: string = "";
		if (this.version === "v2") {
			authHeader = SigningUtil.generateApexAuthorizationHeader(
				this.realm,
				AUTH_PREFIX,
				SigningUtil.HttpMethod.GET,
				uri,
				this.appId,
				queryParams,
				this.privateKeyContent,
				this.privateKeyPassword,
				bearer,
			);
		}
		if (this.version === "v3") {
			const nonce = nonceFactory()();
			const timestamp = new Date().getTime();

			authHeader = SigningUtil.generateMyInfoAuthorizationHeader(
				uri,
				queryParams,
				SigningUtil.HttpMethod.GET,
				this.appId,
				this.privateKeyContent,
				nonce,
				timestamp,
				this.privateKeyPassword,
			);
		}

		const requestConfig: AxiosRequestConfig = {
			params: queryParams,
			headers: {
				Authorization: authHeader,
			},
		};
		const response = await this.axiosClient.get(uri, requestConfig);
		return response;
	}

	public async postForm(
		uri: string,
		formData?: { [key: string]: any },
		bearer?: string,
	): Promise<AxiosResponse> {
		const authHeader = SigningUtil.generateApexAuthorizationHeader(
			this.realm,
			AUTH_PREFIX,
			SigningUtil.HttpMethod.POST,
			uri,
			this.appId,
			formData,
			this.privateKeyContent,
			this.privateKeyPassword,
			bearer,
		);

		const requestConfig: AxiosRequestConfig = {
			headers: {
				"Authorization": authHeader,
				"Cache-Control": "no-cache",
				"Content-Type": "application/x-www-form-urlencoded",
			},
		};

		const response = await this.axiosClient.post(uri, formData, requestConfig);

		return response;
	}
}
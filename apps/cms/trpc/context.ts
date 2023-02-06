import { BaseKeystoneTypeInfo, KeystoneContext } from '@keystone-6/core/types';
import * as trpc from '@trpc/server';
import * as trpcExpress from '@trpc/server/adapters/express';
import { TypeInfo } from '.keystone/types';

interface CreateContextOptions {
	opts: trpcExpress.CreateExpressContextOptions,
	keystoneCtx: KeystoneContext<TypeInfo>
}

export async function createContextInner({ opts, keystoneCtx }: CreateContextOptions) {
	return { opts, keystoneCtx };
}

export type CmsTrpcContext = trpc.inferAsyncReturnType<typeof createContextInner>;

/**
 * Creates context for an incoming request
 * @link https://trpc.io/docs/context
 */
export async function createContextTrpc(
	opts: trpcExpress.CreateExpressContextOptions,
	keystoneCtx: KeystoneContext<TypeInfo>
): Promise<CmsTrpcContext> {
	// for API-response caching see https://trpc.io/docs/caching
	return await createContextInner({ opts, keystoneCtx });
}
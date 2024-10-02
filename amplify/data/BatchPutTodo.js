import { util } from "@aws-appsync/utils";

export function request(ctx) {
  var now = util.time.nowISO8601();

  return {
    operation: "BatchPutItem",
    tables: {
      [`Todo-${ctx.env.apiId}-NONE`]: ctx.args.todos.map((encounter) =>
        util.dynamodb.toMapValues({
          ...encounter,
          id: util.autoId(),
          createdAt: now,
          updatedAt: now,
        })
      ),
    },
  };
}

export function response(ctx) {
  if (ctx.error) {
    util.error(ctx.error.message, ctx.error.type);
  }
  return ctx.result.data[`Todo-${ctx.env.apiId}-NONE`];
}

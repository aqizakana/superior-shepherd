export function onRequest ({ locals, request }, next) {
    // リクエストからデータをインターセプトします
    // 必要に応じて、`locals`内のプロパティを改変します
    locals.title = "新しいタイトル";

    // Responseか`next()`の結果を返します
    return next();
};
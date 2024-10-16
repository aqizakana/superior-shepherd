import type { FunctionalComponent } from 'preact';

const data = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=5").then((response) =>
    response.json()
);

// ビルド時にレンダリングされるコンポーネントはCLIにもログを出力します。
// client:* ディレクティブでレンダリングされた場合、ブラウザコンソールにもログが出力されます。

const Movies: FunctionalComponent = () => {
    // 結果をページに出力する
    return <div>{
        data.map((movie: any) => (
            <div key={movie.id}>
                <h2>{movie.title}</h2>
                <p>{movie.body}</p>
            </div>
        ))
    }
    </div>;
};

export default Movies;
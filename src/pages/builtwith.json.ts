// 出力: /builtwith.json
export async function GET(_: { params: any; request: Request }) {
    return new Response(
        JSON.stringify({
            name: 'Astro',
            url: 'https://astro.build/'
        })
    )
}
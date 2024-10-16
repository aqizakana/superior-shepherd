import { useState } from 'preact/hooks';

interface GreetingProps {
    messages: string[];
}

export default function Greeting({ messages }: GreetingProps) {

    const randomMessage = () => messages[(Math.floor(Math.random() * messages.length))];

    const [greeting, setGreeting] = useState(messages[0]);

    return (
        <div>
            <h3>{greeting}！ 訪問いただきありがとうございます！</h3>
            <button onClick={() => setGreeting(randomMessage())}>
                新しい挨拶
            </button>
        </div>
    );
}
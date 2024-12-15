import ChatBot from "../components/ChatBot";

const Home = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            <div className="w-full max-w-3xl">
                <ChatBot />
            </div>
        </div>
    );
};

export default Home;

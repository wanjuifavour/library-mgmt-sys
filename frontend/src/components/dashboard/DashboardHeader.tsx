export default function DashboardHeader({ username }: { username: string }) {
    return (
        <header className="bg-white dark:bg-gray-800 shadow-sm py-4 px-6 border-b border-gray-200 dark:border-gray-700">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                    Welcome, {username}
                </h1>
            </div>
        </header>
    );
}
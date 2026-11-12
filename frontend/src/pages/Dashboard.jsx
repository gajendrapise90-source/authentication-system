import API from '../services/api';

function Dashboard() {
    const user = JSON.parse(localStorage.getItem('user'));

    const handleLogout = async () => {
        try {
            const token = localStorage.getItem('token');

            await API.post(
                '/auth/logout',
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            localStorage.removeItem('token');
            localStorage.removeItem('user');

            window.location.href = '/login';

        } catch (error) {
            console.error('Logout failed:', error);
            alert('Unable to logout. Please try again.');
        }
    };

    return (
        <div className="dashboard-container">
            <div className="dashboard-card">
                <div>
                    <h1>Dashboard</h1>
                    <p className="dashboard-subtitle">
                        Authentication System
                    </p>
                </div>

                <div className="welcome-section">
                    <h2>Welcome, {user?.username}!</h2>
                    <p>You are successfully logged in.</p>
                </div>

                <div className="user-info">
                    <p><strong>Username:</strong> {user?.username}</p>
                    <p><strong>Email:</strong> {user?.email}</p>
                </div>

                <button className="logout-button" onClick={handleLogout}>
                    Logout
                </button>
            </div>
        </div>
    );
}

export default Dashboard;
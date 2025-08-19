using MySql.Data.MySqlClient;

namespace TaskApplication.service
{
    public class DbConnection
    {
        public String Server {  get; set; }
        public String Database { get; set; }
        public String UserName { get; set; }
        public String Password { get; set; }

        //public MySqlConnection Connection { get; set; }

        private static DbConnection _instance = null;
        public static DbConnection Instance()
        {
            if (_instance == null)
                _instance = new DbConnection();
            return _instance;
        }

        public DbConnection()
        {

        }

        public DbConnection(String server, String database, String userName, String password)
        {
            Server = server;
            Database = database;
            UserName = userName;
            Password = password;
        }

        public String GetConnectionString()
        {
            return string.Format("Server={0}; database={1}; UID={2}; password={3}", Server, Database, UserName, Password);
        }
        
        //public void Connect()
        //{
        //    try
        //    {
        //        string connectionString = string.Format("Server={0}; database={1}; UID={2}; password={3}", Server, Database, UserName, Password);
        //        Connection = new MySqlConnection(connectionString);
        //        Connection.Open();
        //    }
        //    catch (MySqlException e)
        //    {
        //        Console.WriteLine(e.ToString());
        //    }
            
        //}

        //public bool IsConnected()
        //{
        //    if (Connection == null)
        //    {
        //        Connect();
        //    }
        //    return true;
        //}


        //public void Close()
        //{
        //    Connection.Close();
        //}

    }
}

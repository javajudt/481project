package sqllitehelper;

import java.sql.*;

public class DatabaseHelper {

    private static final String dbFilePath = "OrderingSystem.db";
    private static final int cacheSize = 10;
    private static final String tableName = "store";

    private static Connection connection = null;
    private static Product[] productCache = new Product[cacheSize];
    private static int cacheIndex = 0;

    public static boolean isConnected() {
        try{
            return connection != null && !connection.isClosed();
        } catch (SQLException ex){
            System.out.println(ex);
            return false;
        }
    }

    public static boolean tryConnect() {
        try {
            if (!isConnected()) {
                Class.forName("org.sqlite.JDBC");
                System.out.println("Establishing connection...");
                connection = DriverManager.getConnection("jdbc:sqlite:" + dbFilePath);
                System.out.println("Connected to " + dbFilePath);
            } else {
                System.out.println("Already connected to " + dbFilePath);
            }
        } catch (SQLException ex) {
            //TODO any other handling?
            return false;
        } catch (Exception ex) {
            System.out.println(ex);
        } finally {
            return isConnected();
        }
    }

    public static boolean disconnect() {
        try {
            connection.close();
            connection = null;
        } catch (SQLException ex) {
            //TODO any other handling?
            return false;
        } catch (Exception ex) {
            System.out.println(ex);
        } finally {
            return !isConnected();
        }
    }

    public static Product getProduct(long upc) {
        try {
            ResultSet result = executeQuery("select * from "+tableName+" where upc=" + upc);
            //TODO handle result

        } catch (SQLException ex) {
            //TODO handle exception
        } catch (Exception ex) {
            //TODO handle exception
        }
    }

    public static Product getProduct(String sku) {
        try {
            ResultSet result = executeQuery("select * from "+tableName+" where sku=" + sku);
            //TODO handle result

        } catch (SQLException ex) {
            //TODO handle exception
        } catch (Exception ex) {
            //TODO handle exception
        }
    }

    public static boolean addProduct(Product product) {
        try {
            addProductToCache(product);
            //TODO process product
            //TODO execute statement
        } catch (SQLException ex) {
            //TODO handle exception
        } catch (Exception ex) {
            //TODO handle exception
        }
    }
    
    public static boolean removeProduct(long upc) {
        try {
            for (Product prod : productCache){
                if (prod.getUpc() == upc)
                    prod = null;
            }
            return execute("remove from "+tableName+" where upc="+upc);
        }
        catch (Exception ex) {
            System.out.println(ex);
            return false;
        }
    }
    
    public static boolean removeProduct(String sku) {
        try {
            for (Product prod : productCache){
                if (prod.getSku().equals(sku))
                    prod = null;
            }
            return execute("remove from "+tableName+" where sku="+sku);
        }
        catch (Exception ex) {
            System.out.println(ex);
            return false;
        }
    }

    public static boolean removeProduct(Product product) {
        try {
            if (product.getUpc()!=0){
                return removeProduct(product.getUpc());
            }
            else if (product.getSku()!=""){
                return removeProduct(product.getSku());
            }
            else
                throw new IllegalArgumentException("Product does not contain a valid UPC or SKU");
        }
        catch (Exception ex) {
            System.out.println(ex);
            return false;
        }
    }
    
    /**
     * Executes a SQL query and returns whether it was successful.
     * @param sqlQuery The query to execute.
     * @return Returns true if the execution was successful, false otherwise.
     */
    private static boolean execute(String sqlQuery) {
        try {
            if (!isConnected()) {
                throw new IllegalStateException("Not connected to the database");
            }

            Statement statement = connection.createStatement();
            statement.execute(sqlQuery);
            statement.close();
            return true;
        } catch (SQLException ex) {
            System.out.println(ex);
            return false;
        } catch (Exception ex) {
            System.out.println(ex);
            return false;
        }
    }

    /**
     * Executes a SQL query and returns the ResultSet.
     *
     * @param sqlQuery The query to execute.
     * @return Returns the ResultSet resulting from the query.
     * @throws SQLException
     */
    private static ResultSet executeQuery(String sqlQuery) throws SQLException {
        if (!isConnected()) {
            throw new IllegalStateException("Not connected to the database");
        }

        Statement statement = connection.createStatement();
        ResultSet result = statement.executeQuery(sqlQuery);
        statement.close();
        return result;
    }

    /**
     * Adds the specified product to the cache and increments the cache index to
     * the next point of insertion.
     *
     * @param product Product to cache.
     */
    private static void addProductToCache(Product product) {
        // The cache index will end up set at the point of insertion.
        productCache[cacheIndex++] = product;

        if (cacheIndex > 9) {
            cacheIndex = 0;
        }
    }
}

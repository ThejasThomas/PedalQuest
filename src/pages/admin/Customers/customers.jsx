'use client'
import React, { useState, useEffect } from 'react';
import { Card } from '../../../components/UI/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../components/UI/table';
import { User, Search, ChevronUp, ChevronDown } from 'lucide-react';
import { axiosInstance } from '../../../api/axiosInstance';

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await axiosInstance.get('/admin/fetchUserData');
      setCustomers(response.data);
      console.log(response.isActive);
      
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch customers');
    } finally {
      setLoading(false);
    }
  };

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const sortedCustomers = React.useMemo(() => {
    let sortableCustomers = [...customers];
    if (sortConfig.key !== null) {
      sortableCustomers.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableCustomers;
  }, [customers, sortConfig]);

  const handleBlockUser = async(userId)=>{
    try {

   const response = await axiosInstance.put(`/admin/handleBlockUser/${userId}`);
   fetchCustomers();
      
    }
    catch (err) {
      setError(err.response?.data?.message || 'Failed to block user');
    }
  }
  const handleUnblockUser = async (userId) => {
    fetchCustomers();
    
    try {
      await axiosInstance.put(`/admin/unblockUser/${userId}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to unblock user');
    }
  };

  const filteredCustomers = sortedCustomers.filter(customer =>
    customer.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg animate-pulse text-blue-600">Loading customers...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-600 bg-red-100 p-4 rounded-lg shadow-lg font-semibold">
          Error: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gradient-to-br from-blue-50 to-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
          <div className="flex items-center gap-4">
            <User className="w-10 h-10 text-blue-600" />
            <h1 className="text-3xl font-extrabold text-gray-800">Customer Management</h1>
          </div>
          <div className="relative w-full sm:w-72">
            <input
              type="text"
              placeholder="Search customers..."
              className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-3 h-6 w-6 text-gray-400" />
          </div>
        </div>

        <Card className="rounded-xl shadow-lg">
          <div className="overflow-x-auto">
            <Table>
            <TableHeader>
    <TableRow>
      {['Name', 'Email', 'Created At', 'Status'].map((header) => (
        <TableHead key={header}>
          {header}
          {sortConfig.key === header.toLowerCase().replace(' ', '') && (
            <span className="ml-2">
              {sortConfig.direction === 'ascending' ? 
                <ChevronUp className="w-4 h-4" /> : 
                <ChevronDown className="w-4 h-4" />
              }
            </span>
          )}
        </TableHead>
      ))}
    </TableRow>
  </TableHeader>
              <TableBody>
                {filteredCustomers.map((customer) => (
                  <TableRow key={customer._id} className="hover:bg-gray-50">
                    <TableCell className="font-medium">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 mr-3">
                          <span className="h-10 w-10 rounded-full bg-blue-200 flex items-center justify-center text-blue-600 font-bold">
                            {customer.firstName ? customer.firstName.charAt(0).toUpperCase() : 'N/A'}
                          </span>
                        </div>
                        {customer.firstName || 'N/A'}
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-700">{customer.email}</TableCell>
                    <TableCell className="text-gray-500">
                      {new Date(customer.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
    {customer.isBlocked ? (
      <button
        onClick={() => handleUnblockUser(customer._id)}
        className="px-3 py-1 bg-green-100 text-green-700 rounded-md hover:bg-green-200"
      >
        Unblock
      </button>
    ) : (
      <button
        onClick={() => handleBlockUser(customer._id)}
        className="px-3 py-1 bg-red-100 text-red-700 rounded-md hover:bg-red-200"
      >
        Block
      </button>
    )}
  </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Customers;

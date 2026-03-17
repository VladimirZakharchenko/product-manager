import { 
  EllipsisOutlined, 
  PlusCircleOutlined, 
  SearchOutlined,
  LogoutOutlined,
  PlusOutlined
} from '@ant-design/icons';
import { Button, Space, Input, Table, Spin } from 'antd';
import type { TableProps } from 'antd';
import './Product.css';
import { useProductStore } from '../../store/productStore';
import { useAuthStore } from '../../store/authStore';
import { useEffect, useState } from 'react';
import { AddProductModal } from './AddProductModal';
import type { Product } from '../../types/product.types';
import toast from 'react-hot-toast';

export const ProductTable = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout>();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(20);
  
  const { 
    filteredProducts, 
    isLoading, 
    fetchProducts, 
    searchProducts,
    setSortConfig,
    sortConfig
  } = useProductStore();
  
  const logout = useAuthStore(state => state.logout);

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSearch = (value: string) => {
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }
    
    const timeout = setTimeout(() => {
      searchProducts(value);
      setCurrentPage(1);
    }, 500);
    
    setSearchTimeout(timeout);
  };

  const handleLogout = () => {
    logout();
    toast.success('Вы успешно вышли из системы');
  };

  const handleTableChange = (pagination: any) => {
    setCurrentPage(pagination.current);
  };

  const columns: TableProps<Product>['columns'] = [
    {
      title: 'Наименование',
      dataIndex: 'title',
      key: 'title',
      sorter: true,
      sortOrder: sortConfig.key === 'title' ? sortConfig.direction : null,
      onHeaderCell: () => ({
        onClick: () => setSortConfig('title' as keyof Product),
      }),
      render: (text: string, record: Product) => (
        <div>
          <div style={{ fontWeight: 500 }}>{text}</div>
          <div style={{ fontSize: '12px', color: '#999' }}>{record.category}</div>
        </div>
      ),
    },
    {
      title: 'Вендор',
      dataIndex: 'brand',
      key: 'brand',
      sorter: true,
      sortOrder: sortConfig.key === 'brand' ? sortConfig.direction : null,
      onHeaderCell: () => ({
        onClick: () => setSortConfig('brand' as keyof Product),
      }),
      render: (brand: string) => brand || '—',
    },
    {
      title: 'Артикул',
      dataIndex: 'article',
      key: 'article',
      render: (_, record) => `ART-${record.id}`,
    },
    {
      title: 'Оценка',
      dataIndex: 'rating',
      key: 'rating',
      sorter: true,
      sortOrder: sortConfig.key === 'rating' ? sortConfig.direction : null,
      onHeaderCell: () => ({
        onClick: () => setSortConfig('rating' as keyof Product),
      }),
      render: (rating: number) => (
        <span style={{ color: rating < 3 ? '#ff4d4f' : 'inherit', fontWeight: rating < 3 ? 500 : 'normal' }}>
          {rating ? rating.toFixed(1) : '0.0'}/5
        </span>
      ),
    },
    {
      title: 'Цена, ₽',
      dataIndex: 'price',
      key: 'price',
      sorter: true,
      sortOrder: sortConfig.key === 'price' ? sortConfig.direction : null,
      onHeaderCell: () => ({
        onClick: () => setSortConfig('price' as keyof Product),
      }),
      render: (price: number) => price ? price.toFixed(2) : '0.00',
    },
    {
      title: '',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <PlusCircleOutlined 
            style={{ cursor: 'pointer', color: '#52c41a' }} 
            onClick={() => console.log('Add to cart:', record)}
          />
          <EllipsisOutlined 
            style={{ cursor: 'pointer' }} 
            onClick={() => console.log('More options:', record)}
          />
        </Space>
      ),
    },
  ];

  const rowSelection: TableProps<Product>['rowSelection'] = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
  };

  if (isLoading && !filteredProducts.length) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Spin size="large" tip="Загрузка товаров..." />
      </div>
    );
  }

  const totalItems = filteredProducts.length;

  const paginationConfig = {
    current: currentPage,
    pageSize: pageSize,
    total: totalItems,
    showSizeChanger: false,
    showTotal: (total: number, range: [number, number]) => (
      <span>Показано {range[0]}-{range[1]} из {total}</span>
    ),
  };

  return (
    <div className="product-page">
      <header className="main-header">
        <h1>Товары</h1>
        <div className="search-container">
          <Input
            placeholder="Найти товар..."
            prefix={<SearchOutlined />}
            onChange={(e) => handleSearch(e.target.value)}
            allowClear
            size="large"
          />
        </div>
        <Button 
          icon={<LogoutOutlined />} 
          onClick={handleLogout}
          danger
          size="large"
        >
          Выйти
        </Button>
      </header>

      <main className="content">
        <div className="table-card">
          <div className="table-card-header">
            <h2>Все позиции</h2>
            <Button 
              type="primary" 
              icon={<PlusOutlined />}
              onClick={() => setIsModalOpen(true)}
              size="large"
              className="add-button"
            >
              Добавить
            </Button>
          </div>

          <Table<Product>
            rowSelection={{ type: 'checkbox', ...rowSelection }}
            columns={columns}
            dataSource={filteredProducts}
            rowKey="id"
            loading={isLoading}
            onChange={handleTableChange}
            pagination={paginationConfig}
            className="products-table"
          />
        </div>
      </main>
      
      <AddProductModal 
        open={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
};
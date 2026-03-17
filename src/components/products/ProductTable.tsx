import { 
  EllipsisOutlined, 
  PlusCircleOutlined, 
  SearchOutlined,
  LogoutOutlined 
} from '@ant-design/icons';
import { Button, Space, Input, Table, Spin } from 'antd';
import type { TableProps } from 'antd';
import './Product.css';
import { useProductStore } from '../../store/productStore';
import { useAuthStore } from '../../store/authStore';
import { useEffect, useState } from 'react';
import { AddProductModal } from './AddProductModal';
import type { Product } from '../../types/product.types';

export const ProductTable = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout>();
  
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
    }, 500);
    
    setSearchTimeout(timeout);
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
          {rating ? rating.toFixed(1) : '0.0'}
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
      title: 'Действия',
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

  return (
    <>
      <header className="header">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
          <h1>Товары</h1>
          <div style={{ display: 'flex', gap: 16 }}>
            <Input
              placeholder="Найти товар..."
              prefix={<SearchOutlined />}
              onChange={(e) => handleSearch(e.target.value)}
              style={{ width: 300 }}
              allowClear
            />
            <Button 
              type="primary" 
              onClick={() => setIsModalOpen(true)}
            >
              Добавить товар
            </Button>
            <Button 
              icon={<LogoutOutlined />} 
              onClick={logout}
              danger
            >
              Выйти
            </Button>
          </div>
        </div>
      </header>
      <main style={{ padding: 24 }}>
        <Table<Product>
          rowSelection={{ type: 'checkbox', ...rowSelection }}
          columns={columns}
          dataSource={filteredProducts}
          rowKey="id"
          loading={isLoading}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total) => `Всего ${total} товаров`,
          }}
        />
      </main>
      
      <AddProductModal 
        open={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  );
};
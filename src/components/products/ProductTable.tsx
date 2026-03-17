import { CloseOutlined, EllipsisOutlined, LockOutlined, PlusCircleOutlined, SearchOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Flex, Space, Input, Table } from 'antd';
import type { TableProps } from 'antd';
import './Product.css'
import { useState } from 'react';

interface DataType {
  key: React.Key;
  article: string;
  name: string;
  vendor: string;
  grade: number;
  price: number;
}

const columns: TableProps<DataType>['columns'] = [
  {
    title: 'Наименование',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Вендор',
    dataIndex: 'vendor',
    key: 'vendor',
  },
  {
    title: 'Артикул',
    dataIndex: 'article',
    key: 'article',
  },
  {
    title: 'Оценка',
    dataIndex: 'grade',
    key: 'grade',
  },
  {
    title: 'Цена, ₽',
    dataIndex: 'price',
    key: 'price',
  },
  {
    title: 'Action',
    key: 'action',
    render: (_) => (
      <Space size="medium">
        <PlusCircleOutlined />
        <EllipsisOutlined />
      </Space>
    ),
  },
];

const data: DataType[] = [
  {
    key: '1',
    name: 'Dayson',
    vendor: 'Vendor1',
    article: '2222',
    grade: 4.5,
    price: 100
  },
  {
    key: '2',
    name: 'HP',
    vendor: 'Vendor1',
    article: '2222',
    grade: 4.5,
    price: 100
  },
  {
    key: '3',
    name: 'Dayson',
    vendor: 'Vendor3',
    article: '2222',
    grade: 4.5,
    price: 100
  },
  {
    key: '4',
    name: 'Dayson',
    vendor: 'Vendor2',
    article: '2222',
    grade: 4.5,
    price: 100
  },
];

const rowSelection: TableProps<DataType>['rowSelection'] = {
  onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  getCheckboxProps: (record: DataType) => ({
    disabled: record.name === 'Disabled User', // Column configuration not to be checked
    name: record.name,
  }),
};

export const ProductTable = () => {
 
  return (
    <>
      <header className="header">
        <div>Товары</div>
        <Input placeholder="Найти" prefix={<SearchOutlined />} />
      </header>
      <main>
        <Table<DataType>
          rowSelection={{ type: 'checkbox', ...rowSelection }}
          columns={columns}
          dataSource={data}
        />
      </main>
    </>
  );
};
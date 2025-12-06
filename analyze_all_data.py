"""
Comprehensive Data Analysis Script for All Datasets
Analyzes: dashboard_sample_10.xls, NVidia_stock_history.csv, 
         machine-readable-business-employment-data-jun-2025-quarter.csv
"""

import pandas as pd
import numpy as np
import json
from datetime import datetime
import warnings
warnings.filterwarnings('ignore')

def analyze_dashboard_sample():
    """Analyze dashboard_sample_10.xls"""
    print("=" * 80)
    print("ANALYZING: dashboard_sample_10.xls")
    print("=" * 80)
    
    df = pd.read_excel('/vercel/sandbox/uploads/dashboard_sample_10.xls')
    
    analysis = {
        'file_name': 'dashboard_sample_10.xls',
        'total_rows': len(df),
        'total_columns': len(df.columns),
        'columns': list(df.columns),
        'data_types': df.dtypes.astype(str).to_dict(),
        'missing_values': df.isnull().sum().to_dict(),
        'date_range': {
            'start': str(df['Date'].min()),
            'end': str(df['Date'].max())
        },
        'products': {
            'unique_products': df['Product'].unique().tolist(),
            'product_count': df['Product'].value_counts().to_dict()
        },
        'regions': {
            'unique_regions': df['Region'].unique().tolist(),
            'region_count': df['Region'].value_counts().to_dict()
        },
        'sales_statistics': {
            'total_sales': int(df['Sales'].sum()),
            'average_sales': float(df['Sales'].mean()),
            'min_sales': int(df['Sales'].min()),
            'max_sales': int(df['Sales'].max()),
            'std_sales': float(df['Sales'].std())
        },
        'profit_statistics': {
            'total_profit': int(df['Profit'].sum()),
            'average_profit': float(df['Profit'].mean()),
            'min_profit': int(df['Profit'].min()),
            'max_profit': int(df['Profit'].max()),
            'std_profit': float(df['Profit'].std()),
            'profit_margin_avg': float((df['Profit'].sum() / df['Sales'].sum()) * 100)
        },
        'sales_by_product': df.groupby('Product')['Sales'].sum().to_dict(),
        'profit_by_product': df.groupby('Product')['Profit'].sum().to_dict(),
        'sales_by_region': df.groupby('Region')['Sales'].sum().to_dict(),
        'profit_by_region': df.groupby('Region')['Profit'].sum().to_dict(),
        'top_performers': {
            'highest_sales_transaction': df.loc[df['Sales'].idxmax()].to_dict(),
            'highest_profit_transaction': df.loc[df['Profit'].idxmax()].to_dict()
        }
    }
    
    return analysis

def analyze_nvidia_stock():
    """Analyze NVidia_stock_history.csv"""
    print("\n" + "=" * 80)
    print("ANALYZING: NVidia_stock_history.csv")
    print("=" * 80)
    
    df = pd.read_csv('/vercel/sandbox/uploads/NVidia_stock_history.csv')
    
    # Parse date column
    df['Date'] = pd.to_datetime(df['Date'], utc=True, errors='coerce')
    
    # Drop rows with invalid dates
    df = df.dropna(subset=['Date'])
    
    # Calculate additional metrics
    df['Daily_Return'] = df['Close'].pct_change() * 100
    df['Price_Range'] = df['High'] - df['Low']
    df['Year'] = df['Date'].dt.year
    df['Month'] = df['Date'].dt.month
    
    analysis = {
        'file_name': 'NVidia_stock_history.csv',
        'total_rows': len(df),
        'total_columns': len(df.columns),
        'columns': list(df.columns),
        'date_range': {
            'start': str(df['Date'].min()),
            'end': str(df['Date'].max()),
            'total_trading_days': len(df)
        },
        'price_statistics': {
            'opening_price': {
                'first': float(df['Open'].iloc[0]),
                'last': float(df['Open'].iloc[-1]),
                'min': float(df['Open'].min()),
                'max': float(df['Open'].max()),
                'average': float(df['Open'].mean())
            },
            'closing_price': {
                'first': float(df['Close'].iloc[0]),
                'last': float(df['Close'].iloc[-1]),
                'min': float(df['Close'].min()),
                'max': float(df['Close'].max()),
                'average': float(df['Close'].mean())
            },
            'high_price': {
                'all_time_high': float(df['High'].max()),
                'date_of_high': str(df.loc[df['High'].idxmax(), 'Date'])
            },
            'low_price': {
                'all_time_low': float(df['Low'].min()),
                'date_of_low': str(df.loc[df['Low'].idxmin(), 'Date'])
            }
        },
        'volume_statistics': {
            'total_volume': int(df['Volume'].sum()),
            'average_volume': float(df['Volume'].mean()),
            'max_volume': int(df['Volume'].max()),
            'date_of_max_volume': str(df.loc[df['Volume'].idxmax(), 'Date'])
        },
        'returns_analysis': {
            'total_return_percent': float(((df['Close'].iloc[-1] - df['Close'].iloc[0]) / df['Close'].iloc[0]) * 100),
            'average_daily_return': float(df['Daily_Return'].mean()),
            'volatility_std': float(df['Daily_Return'].std()),
            'best_day': {
                'return': float(df['Daily_Return'].max()),
                'date': str(df.loc[df['Daily_Return'].idxmax(), 'Date'])
            },
            'worst_day': {
                'return': float(df['Daily_Return'].min()),
                'date': str(df.loc[df['Daily_Return'].idxmin(), 'Date'])
            }
        },
        'yearly_performance': {},
        'dividends_and_splits': {
            'total_dividends': float(df['Dividends'].sum()),
            'dividend_payments': int(df[df['Dividends'] > 0].shape[0]),
            'stock_splits': int(df[df['Stock Splits'] > 0].shape[0])
        }
    }
    
    # Yearly performance
    yearly_stats = df.groupby('Year').agg({
        'Close': ['first', 'last', 'min', 'max', 'mean'],
        'Volume': 'sum',
        'Daily_Return': 'mean'
    }).round(4)
    
    for year in df['Year'].unique():
        year_data = df[df['Year'] == year]
        first_close = year_data['Close'].iloc[0]
        last_close = year_data['Close'].iloc[-1]
        yearly_return = ((last_close - first_close) / first_close) * 100
        
        analysis['yearly_performance'][int(year)] = {
            'opening_price': float(first_close),
            'closing_price': float(last_close),
            'yearly_return_percent': float(yearly_return),
            'average_price': float(year_data['Close'].mean()),
            'total_volume': int(year_data['Volume'].sum()),
            'trading_days': len(year_data)
        }
    
    return analysis

def analyze_employment_data():
    """Analyze machine-readable-business-employment-data-jun-2025-quarter.csv"""
    print("\n" + "=" * 80)
    print("ANALYZING: machine-readable-business-employment-data-jun-2025-quarter.csv")
    print("=" * 80)
    
    df = pd.read_csv('/vercel/sandbox/uploads/machine-readable-business-employment-data-jun-2025-quarter.csv')
    
    analysis = {
        'file_name': 'machine-readable-business-employment-data-jun-2025-quarter.csv',
        'total_rows': len(df),
        'total_columns': len(df.columns),
        'columns': list(df.columns),
        'data_types': df.dtypes.astype(str).to_dict(),
        'missing_values': df.isnull().sum().to_dict(),
        'unique_values': {
            'series_references': df['Series_reference'].nunique(),
            'periods': df['Period'].nunique(),
            'industries': df['Series_title_1'].nunique(),
            'data_types': df['Series_title_2'].nunique()
        },
        'period_range': {
            'start': float(df['Period'].min()),
            'end': float(df['Period'].max())
        },
        'industries': df['Series_title_1'].unique().tolist(),
        'data_type_categories': df['Series_title_2'].unique().tolist(),
        'employment_statistics': {
            'total_records': len(df),
            'average_filled_jobs': float(df['Data_value'].mean()),
            'max_filled_jobs': int(df['Data_value'].max()),
            'min_filled_jobs': int(df['Data_value'].min())
        }
    }
    
    # Industry-wise analysis
    industry_stats = {}
    for industry in df['Series_title_1'].unique():
        industry_data = df[df['Series_title_1'] == industry]
        industry_stats[industry] = {
            'total_records': len(industry_data),
            'average_jobs': float(industry_data['Data_value'].mean()),
            'max_jobs': int(industry_data['Data_value'].max()),
            'min_jobs': int(industry_data['Data_value'].min()),
            'latest_value': int(industry_data.loc[industry_data['Period'].idxmax(), 'Data_value'])
        }
    
    analysis['industry_statistics'] = industry_stats
    
    # Time series analysis by industry
    time_series_summary = {}
    for industry in df['Series_title_1'].unique()[:5]:  # Top 5 industries
        industry_data = df[(df['Series_title_1'] == industry) & (df['Series_title_2'] == 'Actual')]
        if len(industry_data) > 0:
            industry_data_sorted = industry_data.sort_values('Period')
            first_value = industry_data_sorted['Data_value'].iloc[0]
            last_value = industry_data_sorted['Data_value'].iloc[-1]
            growth = ((last_value - first_value) / first_value) * 100
            
            time_series_summary[industry] = {
                'start_period': float(industry_data_sorted['Period'].iloc[0]),
                'end_period': float(industry_data_sorted['Period'].iloc[-1]),
                'start_value': int(first_value),
                'end_value': int(last_value),
                'growth_percent': float(growth),
                'data_points': len(industry_data_sorted)
            }
    
    analysis['time_series_summary'] = time_series_summary
    
    return analysis

def main():
    """Main analysis function"""
    print("\n" + "=" * 80)
    print("COMPREHENSIVE DATA ANALYSIS")
    print("=" * 80)
    print(f"Analysis Date: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print("=" * 80)
    
    results = {}
    
    # Analyze each dataset
    try:
        results['dashboard_sample'] = analyze_dashboard_sample()
        print("\n✓ Dashboard sample analysis completed")
    except Exception as e:
        print(f"\n✗ Error analyzing dashboard sample: {str(e)}")
        results['dashboard_sample'] = {'error': str(e)}
    
    try:
        results['nvidia_stock'] = analyze_nvidia_stock()
        print("✓ NVIDIA stock analysis completed")
    except Exception as e:
        print(f"✗ Error analyzing NVIDIA stock: {str(e)}")
        results['nvidia_stock'] = {'error': str(e)}
    
    try:
        results['employment_data'] = analyze_employment_data()
        print("✓ Employment data analysis completed")
    except Exception as e:
        print(f"✗ Error analyzing employment data: {str(e)}")
        results['employment_data'] = {'error': str(e)}
    
    # Save results to JSON
    with open('/vercel/sandbox/analysis_results.json', 'w') as f:
        json.dump(results, f, indent=2, default=str)
    
    print("\n" + "=" * 80)
    print("ANALYSIS COMPLETE")
    print("=" * 80)
    print("Results saved to: analysis_results.json")
    
    return results

if __name__ == "__main__":
    results = main()

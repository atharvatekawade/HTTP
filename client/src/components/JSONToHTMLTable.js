import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Dropdown,Container,Input, Menu } from 'semantic-ui-react'
import axios from 'axios';

export default function JSONToHTMLTable(props){
  const { data } = props
  return (
    <div>
      <table className="table table-bordered table-condensed table-sm">
        <tbody>
          {Object.keys(data).map((k) => (
            <tr key={k}>
              {!Array.isArray(data) && 
              <td className="font-weight-bold bg-light text-uppercase" width="20%">
                  {/* Convert snake to space and capitalize for visual */}
                  {k.replace(/_/g, ' ')}
               </td>
               }
              {(() => {
                if (data[k] && typeof data[k] === 'object') {
                  return (
                    <td width="80%">
                      <JSONToHTMLTable data={data[k]} />
                    </td>
                  )
                }
                return (
                  <td width="80%">
                      <b>{data[k]}</b>
                  </td>
                )
              })()}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
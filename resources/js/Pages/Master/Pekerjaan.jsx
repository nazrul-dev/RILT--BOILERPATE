import React, { useEffect } from "react";
import DataTablePekerjaan from "./@partials/DataTablePekerjaan";

const Pekerjaan = ({data, columns, visibleColumns, errors}) => {
   
    // useEffect(() => {
    //     console.log(visibleColumns);
    // }, []);
    
    return (
        <div className="max-w-5xl mx-auto p-5">
           {/* <Input
                        isClearable
                        className="w-full sm:max-w-[44%]"
                        placeholder="Search by name..."
                        startContent={<Search />}
                        // value={filterValue}
                        // onClear={() => onClear()}
                        // onValueChange={onSearchChange}
                    /> */}
            <DataTablePekerjaan datas={data} columns={columns} visibleColumnDefault={visibleColumns} />
        </div>
    );
};

export default Pekerjaan;

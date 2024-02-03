import React, { useEffect, useState } from "react";
import { useRemember, Link, router, usePage } from "@inertiajs/react";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Input,
    Button,
    DropdownTrigger,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Chip,
    User,
    Pagination,
} from "@nextui-org/react";

import { statusOptions } from "./data";
import { ChevronDown, DotIcon, Plus, Search } from "lucide-react";
import { capitalize } from "../../../Utils/helper";

const statusColorMap = {
    active: "success",
    paused: "danger",
    vacation: "warning",
};

export default function DataTablePekerjaan({
    datas,
    columns,
    visibleColumnDefault,
}) {
    const { url } = usePage();
    const [query, setQuery] = useState("");

    // useEffect(() => {
    //     let a = url.toString()+'&search=as';
    //     router.visit(a.toString());
    // }, []);

    const { data, links, per_page, total, current_page } = datas;
    const [all, setAll] = useState(false);
    const [filterValue, setFilterValue] = useState("");
    const [selectedKeys, setSelectedKeys] = useRemember(
        new Set([]),
        "selectedKey"
    );
    const [visibleColumns, setVisibleColumns] = useState(
        new Set(visibleColumnDefault)
    );
    const [statusFilter, setStatusFilter] = useState("all");
    const [rowsPerPage, setRowsPerPage] = useState(per_page);
    const [sortDescriptor, setSortDescriptor] = useState({
        column: "name",
        direction: "ascending",
    });
    const [page, setPage] = React.useState(current_page);

    const hasSearchFilter = Boolean(filterValue);

    const headerColumns = React.useMemo(() => {
        if (visibleColumns === "all") return columns;

        return columns.filter((column) =>
            Array.from(visibleColumns).includes(column.uid)
        );
    }, [visibleColumns]);

    useEffect(() => {
        const z = window.localStorage.getItem("pekerjaanTableSelectedKeys");
        if (z) {
            setSelectedKeys(JSON.parse(z));
        }
    }, []);

    useEffect(() => {
        if (selectedKeys === "all") {
            // setAll(!all)
            // let allRows = [];
            // data.forEach((file) => allRows.push(file.id));
            // window.localStorage.setItem(
            //     "pekerjaanTableSelectedKeys",
            //     JSON.stringify(Array.from(allRows))
            // );
        } else {
            const x = Array.from(selectedKeys);
            if (x.length) {
                window.localStorage.setItem(
                    "pekerjaanTableSelectedKeys",
                    JSON.stringify(Array.from(selectedKeys))
                );
            }
        }
    }, [selectedKeys]);

    const filteredItems = React.useMemo(() => {
        console.log("UPDATED", data);
        let filteredItems = [...data];

        if (hasSearchFilter) {
            filteredItems = filteredItems.filter((item) =>
                item.name.toLowerCase().includes(filterValue.toLowerCase())
            );
        }
        // if (
        //     statusFilter !== "all" &&
        //     Array.from(statusFilter).length !== statusOptions.length
        // ) {
        //     filteredItems = filteredItems.filter((item) =>
        //         Array.from(statusFilter).includes(item.status)
        //     );
        // }

        return filteredItems;
    }, [data, filterValue, statusFilter, current_page]);

    const pages = Math.ceil(total / rowsPerPage);

    const items = React.useMemo(() => {
        const start = (1 - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return filteredItems.slice(start, end);
    }, [page, filteredItems, data, rowsPerPage]);

    const sortedItems = React.useMemo(() => {
        return [...items].sort((a, b) => {
            const first = a[sortDescriptor.column];
            const second = b[sortDescriptor.column];
            const cmp = first < second ? -1 : first > second ? 1 : 0;

            return sortDescriptor.direction === "descending" ? -cmp : cmp;
        });
    }, [sortDescriptor, items]);

    const renderCell = React.useCallback((item, columnKey) => {
        const cellValue = item[columnKey];

        switch (columnKey) {
            case "name":
                return <div className="flex flex-col">{item.name}</div>;
            case "description":
                return <div className="flex flex-col">{item.description}</div>;
            case "actions":
                return (
                    <div className="relative flex justify-end items-center gap-2">
                        <Dropdown>
                            <DropdownTrigger>
                                <Button isIconOnly size="sm" variant="light">
                                    <DotIcon className="text-default-300" />
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu>
                                <DropdownItem>View</DropdownItem>
                                <DropdownItem>Edit</DropdownItem>
                                <DropdownItem>Delete</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                );
            default:
                return cellValue;
        }
    }, []);

    const onRowsPerPageChange = React.useCallback((e) => {
        setRowsPerPage(Number(e.target.value));
        setPage(1);
    }, []);

    const onSearchChange = React.useCallback((value) => {
        
        // setQuery(value);
        if (value) {
            setFilterValue(value);
            setPage(1);
        } else {
            setFilterValue("");
        }
       
    }, []);

    const onClear = React.useCallback(() => {
        setFilterValue("");
        setPage(1);
    }, []);

    const topContent = React.useMemo(() => {
        return (
            <div className="flex flex-col gap-4">
                <div className="flex justify-between gap-3 items-end">
                   
                    <div className="flex gap-3">
                        <Dropdown>
                            <DropdownTrigger className="hidden sm:flex">
                                <Button
                                    endContent={
                                        <ChevronDown className="text-small" />
                                    }
                                    variant="flat"
                                >
                                    Status
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu
                                disallowEmptySelection
                                aria-label="Table Columns"
                                closeOnSelect={false}
                                selectedKeys={statusFilter}
                                selectionMode="multiple"
                                onSelectionChange={setStatusFilter}
                            >
                                {statusOptions.map((status) => (
                                    <DropdownItem
                                        key={status.uid}
                                        className="capitalize"
                                    >
                                        {capitalize(status.name)}
                                    </DropdownItem>
                                ))}
                            </DropdownMenu>
                        </Dropdown>
                        <Dropdown>
                            <DropdownTrigger className="hidden sm:flex">
                                <Button
                                    endContent={
                                        <ChevronDown className="text-small" />
                                    }
                                    variant="flat"
                                >
                                    Columns
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu
                                disallowEmptySelection
                                aria-label="Table Columns"
                                closeOnSelect={false}
                                selectedKeys={visibleColumns}
                                selectionMode="multiple"
                                onSelectionChange={setVisibleColumns}
                            >
                                {columns.map((column) => (
                                    <DropdownItem
                                        key={column.uid}
                                        className="capitalize"
                                    >
                                        {capitalize(column.name)}
                                    </DropdownItem>
                                ))}
                            </DropdownMenu>
                        </Dropdown>
                        <Button color="primary" endContent={<Plus />}>
                            Add New
                        </Button>
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-default-400 text-small">
                        Total {total} data
                    </span>
                    <label className="flex items-center text-default-400 text-small">
                        Rows per page:
                        <select
                            className="bg-transparent outline-none text-default-400 text-small"
                            onChange={onRowsPerPageChange}
                        >
                            <option value="10">10</option>
                            <option value="15">15</option>
                        </select>
                    </label>
                </div>
            </div>
        );
    }, [
        filterValue,
        statusFilter,
        visibleColumns,
        onRowsPerPageChange,
        data.length,
        onSearchChange,
        hasSearchFilter,
    ]);

    const bottomContent = React.useMemo(() => {
        return (
            <div className="py-2 px-2 flex justify-between items-center">
                <span className="w-[30%] text-small text-default-400">
                    {selectedKeys === "all"
                        ? "All items selected"
                        : `${selectedKeys.size} of ${filteredItems.length} selected`}
                </span>
                <Pagination
                    isCompact
                    showControls
                    showShadow
                    color="primary"
                    page={page}
                    total={pages}
                    onChange={(page) => {
                        const baseUrl = window.location.origin;
                        const urlObject = new URL(baseUrl + url);
                        urlObject.searchParams.set("page", page);

                        router.visit(urlObject.toString());
                    }}
                />
            </div>
        );
    }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

    return (
        <div>
            {data.map((item, index) => {
                return <div key={index}>{item.name}</div>;
            })}
            {all ? "1" : "0"}
            <Table
                aria-label="Example table with custom cells, pagination and sorting"
                isHeaderSticky
                bottomContent={bottomContent}
                bottomContentPlacement="outside"
                classNames={{
                    wrapper: "max-h-[382px]",
                }}
                selectedKeys={selectedKeys}
                selectionMode="multiple"
                sortDescriptor={sortDescriptor}
                topContent={topContent}
                topContentPlacement="outside"
                onSelectionChange={(keys) => {
                    if (keys !== "all") {
                        setSelectedKeys(keys);
                    } else {
                        alert("Upgraded TO PRO");
                    }
                }}
                onSortChange={setSortDescriptor}
            >
                <TableHeader columns={headerColumns}>
                    {(column) => (
                        <TableColumn
                            key={column?.uid}
                            align={
                                column?.uid === "actions" ? "center" : "start"
                            }
                            allowsSorting={column?.sortable}
                        >
                            {column?.name}
                        </TableColumn>
                    )}
                </TableHeader>
                <TableBody emptyContent={"No data found"} items={sortedItems}>
                    {(item) => (
                        <TableRow key={item?.id}>
                            {(columnKey) => (
                                <TableCell>
                                    {renderCell(item, columnKey)}
                                </TableCell>
                            )}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}

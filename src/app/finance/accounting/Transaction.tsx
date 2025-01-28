import React from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
  
  

export default function Transaction() {
    const currentDate = new Date();
  return (
    <div className=' w-full flex gap-4'>
        <div className="max-w-[500px] mx-auto bg-white shadow-sm p-6 text-xs">
            <div className=' flex flex-col items-center justify-center gap-2'>
                <div className=' w-[50px] aspect-square rounded-full bg-zinc-800'>

                </div>

                <p className=' text-sm'>Lorem ipsum School</p>

            </div>
            <h1 className="text-lg font-semibold text-center mb-4 mt-6">School Receipt</h1>
            <div className="space-y-2">
                <p><strong>Date:</strong> {currentDate.toLocaleDateString()}</p>
                <p><strong>Received From:</strong> [Student Name]</p>
                <p><strong>Payment Type:</strong> Cash</p>
                <p><strong>Payment for:</strong> School Fees</p>
            </div>
            <div className="mt-6">
                {/* <h2 className="text-lg font-semibold mb-2">Description</h2> */}

                <Table className=' bg-white'>
                {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
                <TableHeader>
                    <TableRow>
                    <TableHead className="w-[100px]">Description</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody className=' text-xs'>
                    <TableRow>
                    <TableCell className="font-medium">Misc. Fees</TableCell>
                    <TableCell className="text-right">$250.00</TableCell>
                    </TableRow>

                    <TableRow>
                    <TableCell className="font-medium">Library Fee</TableCell>
                    <TableCell className="text-right">$150.00</TableCell>
                    </TableRow>
                </TableBody>
                </Table>

            </div>
            <div className="mt-4 flex items-end justify-end">
                <p><strong>Total:</strong> $2,700.00</p>
            </div>
            <div className="mt-6">
                <p><strong>Amount:</strong> 3000</p>
                <p><strong>Change:</strong> 300</p>
            </div>
            <div className="mt-6 text-center">
                <p>Thank you for your payment. For any further inquiries, please contact us at [YOUR EMAIL] or call [YOUR COMPANY NUMBER].</p>
            </div>

            <div className=' w-full flex items-end justify-end mt-12'>
                <div className=' flex flex-col'>
                    <hr />
                    <p>Accounting Officer</p>

                </div>

            </div>
            </div>

        <Table className=' bg-white'>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
            <TableRow>
            <TableHead className="w-[100px]">Invoice</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Method</TableHead>
            <TableHead className="text-right">Amount</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            <TableRow>
            <TableCell className="font-medium">INV001</TableCell>
            <TableCell>Paid</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell className="text-right">$250.00</TableCell>
            </TableRow>
        </TableBody>
        </Table>

    </div>
  )
}

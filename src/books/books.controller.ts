import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { BooksService } from './books.service';
import { AuthGuard } from '@nestjs/passport';
import { DeleteDTO } from './dto/deleteBook.dto';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Role } from 'src/auth/enums/role.enum';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { SaveBookDTO } from './dto/saveBook.dto';
import { GetBooksQuery } from './queries/getBooks.query';

@Controller('books')
@UseGuards(AuthGuard())
export class BooksController {
  constructor(private booksService: BooksService) {}
  @Get()
  @UseGuards(AuthGuard(), RolesGuard)
  @Roles(Role.USER)
  getBooks(@Query() query: GetBooksQuery) {
    return this.booksService.getBooks(query);
  }
  @Get(":id")
  getBooksById(@Param("id") id) {
    return this.booksService.getBookById(id);
  }
  @Post()
  createBook(@Body() body: SaveBookDTO) {
    return this.booksService.createBook(body);
  }
  @Put(":id")
  updateBook(@Param("id") id, @Body() body) {
    return this.booksService.editBook(body, id);
  }
  @Delete()
  deleteBook(@Body() body: DeleteDTO) {
    return this.booksService.deleteBookById(body.id);
  }
}

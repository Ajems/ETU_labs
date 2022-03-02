all: main.o print.o change_sent.o read.o structs.o
	gcc main.o print.o change_sent.o read.o -o cw

main.o: main.c print.h change_sent.h read.h structs.h
	gcc -c main.c

print.o: print.c structs.h
	gcc -c print.c

change_sent.o: change_sent.c print.h structs.h
	gcc -c change_sent.c

read.o: read.c structs.h
	gcc -c read.c

structs.o: structs.c structs.h
	gcc -c structs.c

clean:
	rm  *.o
